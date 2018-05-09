import { inject } from '@ember/service';
import Component from '@ember/component';

/**
 * @class UserCollectionItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  router: inject(),

  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.checkIfUserIsBeingFollowed();
  },

  /**
   * @function
   */
  handleUserClick() {
    const user = this.get('--user');

    this.get('router').transitionTo('profile', user.get('username') || user.get('id'));
  },

  /**
   * @function
   */
  handleFollowUser() {
    this.set('isUserBeingFollowed', true);
  },

  /**
   * @function
   */
  handleUnfollowUser() {
    this.set('isUserBeingFollowed', false);
  },

  /**
   * @function
   * @private
   */
  async checkIfUserIsBeingFollowed() {
    const currentUser = this.get('session.model');

    if (currentUser && currentUser.get('id') !== this.get('--user.id')) {
      const isUserBeingFollowed = await currentUser.isFollowing(this.get('--user.id'));

      if (!this.get('isDestroyed')) {
        this.set('isUserBeingFollowed', isUserBeingFollowed);
      }
    }
  },
});
