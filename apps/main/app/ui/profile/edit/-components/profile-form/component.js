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

    this.set('profile', {
      displayName: this.get('--user.displayName'),
      username: this.get('--user.displayUsername'),
    });
  },

  /**
   * Handles the profile form's data change event
   *
   * @param {Element} target
   */
  handleProfileFormDataChange(target) {
    this.set('profile', {
      ...this.get('profile'),
      [target.name]: target.value,
    });
  },
});
