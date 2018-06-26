/* eslint no-await-in-loop: 'off' */

import { hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import fetch from 'fetch';

import { promiseObject } from '@cenchat/core/utils/computed-promise';

/**
 * @class User
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {string}
   */
  displayName: attr('string'),

  /**
   * @type {string}
   */
  displayUsername: attr('string'),

  /**
   * @type {string}
   */
  name: attr('string'),

  /**
   * @type {string}
   */
  photoUrl: attr('string'),

  /**
   * @type {Object}
   */
  provider: attr(),

  /**
   * @type {string}
   */
  shortBio: attr('string'),

  /**
   * Lower cased version of `displayUsername`
   *
   * @type {string}
   */
  username: attr('string'),

  /**
   * @type {Array.<Model.User>}
   */
  followers: hasMany('user', {
    inverse: 'followings',
    limit: 8,
  }),

  /**
   * @type {Array.<Model.User>}
   */
  followings: hasMany('user', {
    inverse: 'followers',
    limit: 8,
  }),

  /**
   * @type {Array.<Model.Notification>}
   */
  notifications: hasMany('notification', {
    inverse: 'to',
    limit: 8,
  }),

  /**
   * @type {Array.<Model.Site>}
   */
  sitesAsAdmin: hasMany('site', {
    inverse: 'admins',
    limit: 8,
  }),

  /**
   * @type {Array.<Model.StickerPack>}
   */
  stickerPacks: hasMany('sticker-pack'),

  /**
   * @type {Ember.Service}
   * @readonly
   */
  firebase: inject(),

  /**
   * @type {string}
   */
  avatarUrl: computed('provider.facebook', {
    get() {
      let avatarUrl = 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114';

      if (this.provider && this.provider.facebook) {
        avatarUrl = `https://graph.facebook.com/${this.provider.facebook}/picture?type=large`;
      }

      return avatarUrl;
    },
  }),

  /**
   * @type {Model.BetaTester}
   */
  betaTester: promiseObject(({ id, store }) => (
    store.findRecord('betaTester', id).catch(() => ({ status: 'unapplied' }))
  )),

  /**
   * @type {Model.UserMetaInfo}
   */
  metaInfo: promiseObject(({ id, store }) => store.findRecord('userMetaInfo', id)),

  /**
   * @type {string}
   */
  urlKey: computed('username', {
    get() {
      return this.username || this.id;
    },
  }),

  /**
   * @param {string} userId
   * @return {Promise} Resolves to true if following userId. Otherwise, false.
   * @function
   */
  async isFollowing(userId) {
    const db = this.firebase.firestore();
    const following = await db
      .collection('users')
      .doc(this.id)
      .collection('followings')
      .doc(userId)
      .get();

    return following.exists;
  },

  /**
   * @param {string} userId
   * @return {Promise.<boolean>} Resolves to true if is a follower. Otherwise, false.
   * @function
   */
  async hasFollower(userId) {
    const db = this.firebase.firestore();
    const follower = await db
      .collection('users')
      .doc(this.id)
      .collection('followers')
      .doc(userId)
      .get();

    return follower.exists;
  },

  /**
   * @param {string} siteId
   * @return {Promise.<boolean>} Resolves to true if is a site admin. Otherwise, false.
   * @function
   */
  async isSiteAdmin(siteId) {
    const db = this.firebase.firestore();

    try {
      const admin = await db
        .collection('sites')
        .doc(siteId)
        .collection('admins')
        .doc(this.id)
        .get();

      return admin.exists;
    } catch (error) {
      return false;
    }
  },

  /**
   * @param {number} limit
   * @return {Array.<Model.User>} Unfollowings
   * @function
   */
  async getUnfollowedFacebookFriends(limit) {
    const userMetaInfo = await this.get('metaInfo');
    const url = `https://graph.facebook.com/v2.12/${this.facebookId}/friends?access_token=${userMetaInfo.get('facebookAccessToken')}&limit=5000`;
    const response = await fetch(url);
    const { data } = await response.json();
    const unfollowings = [];

    for (const { id } of data) {
      const friends = await this.store.query('user', {
        limit: 1,

        filter(reference) {
          return reference.where('facebookId', '==', id);
        },
      });
      const friend = friends.firstObject;

      if (!await this.isFollowing(friend.id)) {
        unfollowings.push(friend);
      }

      if (unfollowings.length >= limit) {
        break;
      }
    }

    return unfollowings;
  },
});
