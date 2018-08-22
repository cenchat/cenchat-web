import Component from '@ember/component';

/**
 * @class SignInRouteContent
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

    this.set('redirectUrl', new URL(window.location).searchParams.get('redirect_url'));
  },
});
