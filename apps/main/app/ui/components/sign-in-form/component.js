import { inject } from '@ember/service';
import Component from '@ember/component';

import firebase from 'firebase';
import firebaseui from 'firebaseui';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class SignInForm
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  router: inject(),

  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @type {Ember.Service}
   */
  store: inject(),

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
        signInSuccess: () => {
          this.fetchOrCreateUserRecord();
        },
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      tosUrl: 'https://cenchat.com/about/terms',
    });
  },

  /**
   * Fetches or creates a user record
   */
  async fetchOrCreateUserRecord() {
    const session = this.get('session');

    try {
      await session.fetch();

      const store = this.get('store');
      let user;

      try {
        user = await store.findRecord('user', session.get('currentUser.uid'));
      } catch (e) {
        const currentUser = session.get('currentUser');

        user = store.createRecord('user', {
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL,
        });

        await user.save({ adapterOptions: { onServer: true } });
      }

      session.set('content.model', user);
      this.get('router').transitionTo('profile', user.get('id'));
      toast(`Signed in as ${user.get('displayName')}`);
    } catch (e) {
      toast('Couldn\'t sign in. Please try again.');
    }
  },
});
