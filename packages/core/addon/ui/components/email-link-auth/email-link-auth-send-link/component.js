import { getOwner } from '@ember/application';
import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

import layout from './template';

/**
 * @class EmailLinkAuthSendLink
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
   * @param {Element} target
   * @function
   */
  setEmail(target) {
    this.set('email', target.value);
  },

  /**
   * @return {Promise} Resolves when sign in link succeeds or fails
   * @function
   */
  async sendSignInLinkToEmail() {
    let { emailLinkSignInUrl } = getOwner(this).resolveRegistration('config:environment');

    if (this.args.redirectUrl) {
      emailLinkSignInUrl += `?redirect_url=${this.args.redirectUrl}`;
    }

    await this.args.firebase.auth().sendSignInLinkToEmail(this.email, {
      url: emailLinkSignInUrl,
      handleCodeInApp: true,
    });
    localStorage.setItem('cenchatEmailForSignIn', this.email);
    toast('Link sent');
  },
});
