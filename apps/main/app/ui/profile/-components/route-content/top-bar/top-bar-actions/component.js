import Component from '@ember/component';

/**
 * @class ProfileTopBarActions
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isFollowingUser: null,

  /**
   * @override
   */
  didReceiveAttrs() {
    if (this.get('--session.model.id') === this.get('--user.id')) {
      this.set('isFollowingUser', false);
    } else {
      this.get('--session.model').isFollowing(this.get('--user.id')).then(
        (result) => {
          this.set('isFollowingUser', result);
        },
      );
    }
  },

  /**
   * Handles follow user's click event
   */
  async handleFollowUser() {
    this.set('isFollowingUser', true);
  },

  /**
   * Handles unfollow user's click event
   *
   * @param {Model.User} user
   */
  async handleUnfollowUser(user) {
    this.set('isFollowingUser', false);
  },
});
