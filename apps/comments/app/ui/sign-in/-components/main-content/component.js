import Component from '@ember/component';

/**
 * @class SignInMainContent
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
  redirectUrl: null,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('redirectUrl', new URL(window.location).searchParams.get('redirect_url'));
  },
});
