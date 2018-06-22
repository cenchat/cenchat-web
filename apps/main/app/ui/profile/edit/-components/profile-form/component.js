import Component from '@ember/component';

/**
 * @class ProfileEditProfileForm
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

    const { displayName, shortBio, displayUsername: username } = this.args.user;

    this.set('profile', { displayName, shortBio, username });
  },

  /**
   * @param {Element} target
   * @function
   */
  handleProfileFormDataChange(target) {
    this.set('profile', { ...this.profile, [target.name]: target.value });
  },
});
