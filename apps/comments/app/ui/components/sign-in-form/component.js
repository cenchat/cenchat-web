import Component from '@ember/component';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

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

    this.set('uiConfig', {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      callbacks: {
        signInSuccess() {
          if (window.opener) {
            window.opener.location.reload();
            window.close();
          }
        },
      },
      signInOptions: [{
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ['public_profile', 'user_friends'],
      }, {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      }],
      tosUrl: 'https://cenchat.com/about/terms',
    });
  },
});
