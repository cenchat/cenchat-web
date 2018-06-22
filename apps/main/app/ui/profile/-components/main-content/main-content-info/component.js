import Component from '@ember/component';

/**
 * @class MainContentInfo
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
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
    const id = this.args.user.get('id');
    const currentUser = this.args.session.get('model');

    if (currentUser && currentUser.get('id') !== id) {
      const isUserBeingFollowed = await currentUser.isFollowing(id);

      if (!this.get('isDestroyed')) {
        this.set('isUserBeingFollowed', isUserBeingFollowed);
      }
    }
  },
});
