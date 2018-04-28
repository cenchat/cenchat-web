import { Promise } from 'rsvp';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { promiseArray } from '@cenchat/core/utils/computed-promise';

import fetch from 'fetch';

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
   * @type {Model.Site}
   */
  site: belongsTo('site'),

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
  parsedAttachments: promiseArray((context) => {
    if (Array.isArray(context.get('attachments'))) {
      const requests = [];

      context.get('attachments').forEach((attachment) => {
        if (attachment.type === 'sticker') {
          requests.push(context.get('store').findRecord(
            'sticker',
            attachment.id,
          ));
        } else if (attachment.type === 'tenor_gif') {
          requests.push(context.findTenorGif(attachment.id));
        }
      });

      return Promise.all(requests);
    }

    return Promise.resolve([]);
  }, 'attachments'),

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
   * @param {string} id
   * @private
   */
  async findTenorGif(id) {
    const { tenorApiKey } = getOwner(this).resolveRegistration('config:environment');
    const response = await fetch(`https://api.tenor.com/v1/gifs?ids=${id}&key=${tenorApiKey}&media_filter=minimal`);
    const data = await response.json();
    const gif = data.results[0];

    return {
      id: gif.id,
      description: gif.title,
      imageUrl: gif.media[0].tinygif.url,
      type: 'tenor_gif',
    };
  },
});
