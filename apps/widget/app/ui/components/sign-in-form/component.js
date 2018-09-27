import Component from '@ember/component';

/**
 * @class SignInForm
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

    this.buildRedirectUrl();
  },

  /**
   * @function
   */
  async buildRedirectUrl() {
    const { page } = this.args;
    const redirectUrl = `http://${page.site.hostname}${decodeURIComponent(page.slug)}`;

    this.set('redirectUrl', redirectUrl);
  },
});
