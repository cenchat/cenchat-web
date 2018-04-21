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
   * Handles the user's click event
   */
  handleUserClick() {
    const user = this.get('--user');

    this.get('router').transitionTo('profile', user.get('username') || user.get('id'));
  },

  /**
   * Handles the follow user's click event
   */
  handleFollowUser() {
    this.set('isUserBeingFollowed', true);
  },

  /**
   * Handles the unfollow user's click event
   */
  handleUnfollowUser() {
    this.set('isUserBeingFollowed', false);
  },

  /**
   * Checks if user is being followed
   */
  async checkIfUserIsBeingFollowed() {
    const currentUser = this.get('session.model');

    const isUserBeingFollowed = await currentUser.isFollowing(this.get('--user.id'));

    if (!this.get('isDestroyed')) {
      this.set('isUserBeingFollowed', isUserBeingFollowed);
    }
  },
});
