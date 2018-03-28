import { Promise } from 'rsvp';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class Comment
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {Array}
   */
  attachments: attr(),

  /**
   * @type {Date}
   */
  createdOn: attr('timestamp'),

  /**
   * @type {boolean}
   */
  isAskMeAnything: attr('boolean'),

  /**
   * @type {boolean}
   */
  isDeleted: attr('boolean'),

  /**
   * @type {Object}
   */
  taggedEntities: attr(),

  /**
   * @type {string}
   */
  text: attr('string'),

  /**
   * @type {Model.User}
   */
  author: belongsTo('user', { inverse: null }),

  /**
   * @type {Model.Page}
   */
  page: belongsTo('page'),

  /**
   * @type {Model.Comment}
   */
  replyTo: belongsTo('comment', { inverse: null }),

  /**
   * @type {Model.Comment}
   */
  root: belongsTo('comment', { inverse: null }),

  /**
   * @type {Ember.Service}
   * @readonly
   */
  firebase: inject(),

  /**
   * @type {Ember.Service}
   * @readonly
   */
  session: inject(),

  /**
   * @type {boolean}
   */
  isMessageValid: computed('attachments', 'text', {
    get() {
      if (
        this.get('text')
        || (
          this.get('attachments')
          && this.get('attachments').length > 0
        )
      ) {
        return true;
      }

      return false;
    },
  }),

  /**
   * @type {boolean}
   */
  isFromFollowing: computed('session.model', {
    get() {
      if (this.get('session.model')) {
        const authorId = this.belongsTo('author').id();

        this.get('session.model').isFollowing(authorId).then(result => (
          this.set('isFromFollowing', result)
        ));
      } else {
        this.set('_isFromFollowing', false);
      }

      return this.get('_isFromFollowing');
    },

    set(key, value) {
      this.set('_isFromFollowing', value);

      return value;
    },
  }),

  /**
   * @type {boolean}
   */
  isAskMeAnythingAllowed: computed({
    get() {
      this.checkIfAuthorIsSiteAdmin().then(isSiteAdmin => (
        this.set('isAskMeAnythingAllowed', isSiteAdmin)
      ));

      return this.get('_isAskMeAnythingAllowed');
    },

    set(key, value) {
      this.set('_isAskMeAnythingAllowed', value);

      return value;
    },
  }),

  /**
   * @type {boolean}
   */
  isTextAllowed: computed({
    get() {
      if (this.get('text')) {
        this.set('_isTextAllowed', true);
      }

      if (!this.get('_isTextAllowed')) {
        if (this.get('replyTo.isAskMeAnything')) {
          this.set('_isTextAllowed', true);
        } else {
          this.checkIfIsReplyingToFollower().then((isReplyingToFollower) => {
            if (isReplyingToFollower) {
              this.set('isTextAllowed', true);
            } else {
              this.checkIfAuthorIsSiteAdmin().then((isSiteAdmin) => {
                this.set('isTextAllowed', isSiteAdmin);
              });
            }
          });
        }
      }

      return this.get('_isTextAllowed');
    },

    set(key, value) {
      this.set('_isTextAllowed', value);

      return value;
    },
  }),

  /**
   * @type {Array}
   */
  parsedAttachments: computed('attachments', {
    get() {
      if (Array.isArray(this.get('attachments'))) {
        const requests = [];

        this.get('attachments').forEach((attachment) => {
          if (attachment.type === 'sticker') {
            requests.push(this.get('store').findRecord(
              'sticker',
              attachment.id,
            ));
          }
        });

        Promise.all(requests).then(results => this.set('parsedAttachments', results));
      }

      return this.get('_parsedAttachments');
    },

    set(key, attachments) {
      this.set('_parsedAttachments', attachments);
      this.set('attachments', this.serializeAttachments(attachments));

      return attachments;
    },
  }),

  /**
   * @type {Array}
   */
  parsedTaggedEntities: computed('taggedEntities', {
    get() {
      const requests = [];
      const taggedEntities = this.get('taggedEntities');

      if (taggedEntities) {
        for (const entity of Object.keys(taggedEntities)) {
          if (taggedEntities[entity] === 'user') {
            const findRecord = this.get('store').findRecord('user', entity);

            requests.push(findRecord);
          }
        }
      }

      Promise.all(requests).then((results) => {
        this.set('parsedTaggedEntities', results);
      });

      return this.get('_parsedTaggedEntities');
    },

    set(key, taggedEntities) {
      this.set('_parsedTaggedEntities', taggedEntities);

      return taggedEntities;
    },
  }),

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('_isFromFollowing', false);
    this.set('_isAskMeAnythingAllowed', false);
    this.set('_isTextAllowed', false);
    this.set('_parsedAttachments', []);
    this.set('_parsedTaggedEntities', {});
  },

  /**
   * Checks if author of the comment to reply to is a follower of the
   * current user
   *
   * @return {Promise.<boolean>} Resolves to true if a follower. Otherwise, false.
   */
  checkIfIsReplyingToFollower() {
    const replyTo = this.get('replyTo');

    if (replyTo.get('id')) {
      return this.get('author').then(author => author.hasFollower(replyTo.get('author.id')));
    }

    return Promise.resolve(false);
  },

  /**
   * Checks if the author is a site admin
   *
   * @return {Promise.<boolean>} Resolves to true if a site admin. Otherwise, false.
   */
  checkIfAuthorIsSiteAdmin() {
    const siteId = this.get('page.site.id');

    return this.get('author').then(author => author.isSiteAdmin(siteId));
  },

  /**
   * Loads comment replies
   *
   * @return {Promise} Resolves to the comment replies
   */
  loadReplies() {
    const commentId = this.get('id');

    if (!this.belongsTo('root').id()) {
      return this.get('store').query('comment', {
        queryId: `${commentId}_replies`,

        buildReference(db) {
          return db.collection('comments');
        },

        filter(reference) {
          return reference
            .where('root', '==', reference.doc(commentId))
            .orderBy('createdOn')
            .limit(2);
        },
      });
    }

    return this.get('store').query('comment', {
      queryId: `${commentId}_replies`,

      buildReference(db) {
        return db.collection('comments');
      },

      filter(reference) {
        return reference
          .where('replyTo', '==', reference.doc(commentId))
          .orderBy('createdOn')
          .limit(2);
      },
    });
  },

  /**
   * Serializes a comment's attachments
   *
   * @param {Array} attachments
   * @return {Array} Serialized attachments
   * @private
   */
  serializeAttachments(attachments) {
    if (Array.isArray(attachments)) {
      const serializedAttachments = [];

      for (const attachment of attachments) {
        serializedAttachments.push({
          id: attachment.get('id'),
          type: attachment.get('constructor.modelName'),
        });
      }

      return serializedAttachments;
    }

    return null;
  },
});
