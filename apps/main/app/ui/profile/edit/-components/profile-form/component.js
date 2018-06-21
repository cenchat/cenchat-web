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

    const { user } = this.args;

    this.set('profile', {
      displayName: user.get('displayName'),
      shortBio: user.get('shortBio'),
      username: user.get('username'),
    });
  },

  /**
   * @param {Element} target
   * @function
   */
  handleProfileFormDataChange(target) {
    this.set('profile', {
      ...this.get('profile'),
      [target.name]: target.value,
    });
  },
});
