import Component from '@ember/component';

/**
 * @class ProfileMissingInfoUsername
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  username: null,

  /**
   * Handles the username field's input event
   *
   * @param {Element} target
   */
  handleUsernameInput(target) {
    this.set('username', target.value);
  },
});
