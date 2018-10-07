import Component from '@ember/component';

/**
 * @class ProfileEditRouteContent
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
      displayName: user.displayName,
      shortBio: user.shortBio,
      username: user.username,
    });
  },

  /**
   * @param {Element} target
   * @function
   */
  handleProfileFormDataChange(target) {
    this.set('profile', { ...this.profile, [target.name]: target.value });
  },
});
