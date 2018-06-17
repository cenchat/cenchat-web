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
    this.transitionToProfile();
  },

  /**
   * @param {Event} event
   * @function
   */
  handleUserKeydown(event) {
    const code = event.which;

    if (code === 13 || code === 32) {
      event.preventDefault();
      this.transitionToProfile();
    }
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
   */
  async checkIfUserIsBeingFollowed() {
    const currentUser = this.get('session.model');

    const { id } = this.args.user;

    if (currentUser && currentUser.get('id') !== id) {
      const isUserBeingFollowed = await currentUser.isFollowing(id);

      if (!this.get('isDestroyed')) {
        this.set('isUserBeingFollowed', isUserBeingFollowed);
      }
    }
  },

  /**
   * @function
   */
  transitionToProfile() {
    const { user } = this.args;

    this.get('router').transitionTo('profile', user.get('username') || user.get('id'));
  },
});
