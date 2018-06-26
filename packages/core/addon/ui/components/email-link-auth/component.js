import { inject as service } from '@ember/service';
import Component from '@ember/component';

import layout from './template';

/**
 * @class EmailLinkAuth
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service(),

  /**
   * @type {Ember.Service}
   */
  router: service(),

  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isSignInWithEmailLink: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.firebase.auth().isSignInWithEmailLink(window.location.href)) {
      this.set('isSignInWithEmailLink', true);
    }
  },

  /**
   * @param {string} email
   * @param {string} displayName
   * @return {Promise} Resolves when sign in succeeds or fails
   * @function
   */
  async handleSignInClick(email, displayName) {
    await this.get('session').open('firebase', { displayName, email });

    if (this.args.redirectUrl) {
      window.location.replace(this.args.redirectUrl);
    } else {
      this.router.transitionTo('profile', this.get('session.model.urlKey'));
    }
  },
});
