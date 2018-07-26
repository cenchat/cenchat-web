import { Promise } from 'rsvp';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import fetch from 'fetch';

import { computedPromise, promiseArray } from '@cenchat/core/utils/computed-promise';

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
  isDeleted: attr('boolean'),

  /**
   * @type {string}
   */
  status: attr('string'),

  /**
   * @type {Object}
   */
  taggedEntity: attr(),

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
   * @type {Model.User|Object}
   */
  authorOrAnonymous: computed('author', {
    get() {
      if (this.get('author.id')) {
        return this.get('author');
      }

      return {
        displayName: 'Anonymous',
        avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114',
      };
    },
  }),

  /**
   * @type {boolean}
   */
  isMessageValid: computed('attachments', 'text', {
    get() {
      if (this.text || (this.attachments && this.attachments.length > 0)) {
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

        if (authorId) {
          this.get('session.model').isFollowing(authorId).then(result => (
            this.set('isFromFollowing', result)
          ));
        } else {
          this.set('_isFromFollowing', false);
        }
      } else {
        this.set('_isFromFollowing', false);
      }

      return this._isFromFollowing;
    },

    set(key, value) {
      this.set('_isFromFollowing', value);

      return value;
    },
  }),

  /**
   * @type {boolean}
   */
  isTextAllowed: computed({
    get() {
      if (this.text) {
        this.set('_isTextAllowed', true);
      }

      if (!this._isTextAllowed) {
        this.checkIfIsReplyingToFollower().then((isReplyingToFollower) => {
          if (isReplyingToFollower) {
            this.set('isTextAllowed', true);
          } else {
            this.checkIfIsReplyingToSiteAdmin().then((isReplyingToSiteAdmin) => {
              if (isReplyingToSiteAdmin) {
                this.set('isTextAllowed', true);
              } else {
                this.checkIfAuthorIsSiteAdmin().then((isSiteAdmin) => {
                  this.set('isTextAllowed', isSiteAdmin);
                });
              }
            });
          }
        });
      }

      return this._isTextAllowed;
    },

    set(key, value) {
      this.set('_isTextAllowed', value);

      return value;
    },
  }),

  /**
   * @type {Array}
   */
  parsedAttachments: computedPromise('array', 'parsedAttachments', (context) => {
    if (Array.isArray(context.attachments)) {
      const requests = context.attachments.map(({ id, type }) => {
        if (type === 'sticker') {
          return context.store.findRecord('sticker', id);
        }

        return context.findTenorGif(id);
      });

      return Promise.all(requests);
    }

    return Promise.resolve([]);
  }, 'attachments'),

  /**
   * @type {Array}
   */
  parsedTaggedEntity: promiseArray((context) => {
    const { taggedEntity } = context;

    if (taggedEntity) {
      const requests = [];

      Object.keys(taggedEntity).forEach((entity) => {
        if (taggedEntity[entity] === 'user') {
          requests.push(context.store.findRecord('user', entity));
        }
      });

      return Promise.all(requests);
    }

    return Promise.all([]);
  }, 'taggedEntity'),

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('_isFromFollowing', false);
    this.set('_isTextAllowed', false);
  },

  /**
   * @return {Promise} Resolves to the comment replies
   * @function
   */
  loadReplies() {
    const commentId = this.id;

    if (!this.belongsTo('root').id()) {
      return this.store.query('comment', {
        queryId: `${commentId}_replies`,
        limit: 2,

        buildReference(db) {
          return db.collection('comments');
        },

        filter(reference) {
          return reference
            .where('root', '==', reference.doc(commentId))
            .orderBy('createdOn');
        },
      });
    }

    return this.store.query('comment', {
      queryId: `${commentId}_replies`,
      limit: 2,

      buildReference(db) {
        return db.collection('comments');
      },

      filter(reference) {
        return reference
          .where('replyTo', '==', reference.doc(commentId))
          .orderBy('createdOn');
      },
    });
  },

  /**
   * @return {Promise.<boolean>} Resolves to true if a follower. Otherwise, false.
   * @function
   * @private
   */
  checkIfIsReplyingToFollower() {
    const replyTo = this.get('replyTo');

    if (replyTo.get('id') && replyTo.get('author.id')) {
      return this.get('author').then(author => author.hasFollower(replyTo.get('author.id')));
    }

    return Promise.resolve(false);
  },

  /**
   * @return {Promise.<boolean>} Resolves to true if a follower. Otherwise, false.
   * @function
   * @private
   */
  checkIfIsReplyingToSiteAdmin() {
    const replyTo = this.get('replyTo');

    if (replyTo.get('id') && replyTo.get('author.id')) {
      const siteId = this.get('page.site.id');

      return replyTo.get('author').then(author => author.isSiteAdmin(siteId));
    }

    return Promise.resolve(false);
  },

  /**
   * @return {Promise.<boolean>} Resolves to true if a site admin. Otherwise, false.
   * @function
   * @private
   */
  checkIfAuthorIsSiteAdmin() {
    const siteId = this.get('page.site.id');

    return this.get('author').then(author => author.isSiteAdmin(siteId));
  },

  /**
   * @param {string} id
   * @function
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
      height: gif.media[0].tinygif.dims[1],
      imageUrl: gif.media[0].tinygif.url,
      type: 'tenor_gif',
      width: gif.media[0].tinygif.dims[0],
    };
  },
});
