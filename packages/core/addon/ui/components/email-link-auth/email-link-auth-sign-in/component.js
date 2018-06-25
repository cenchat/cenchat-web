import Component from '@ember/component';

import layout from './template';

/**
 * @class EmailLinkAuthSignIn
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  email: null,

  /**
   * @type {boolean}
   */
  isEmailNotExisting: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('email', localStorage.getItem('cenchatEmailForSignIn'));
  },

  /**
   * @param {Element} target
   * @function
   */
  setEmail(target) {
    this.set('email', target.value);
  },

  /**
   * @function
   */
  async continueSignIn() {
    const auth = this.args.firebase.auth();

    const providers = await auth.fetchProvidersForEmail(this.email);

    if (providers.length === 0) {
      this.set('isEmailNotExisting', true);
    } else {
      await this.args.onSignInClick(this.email);
    }
  },
});
