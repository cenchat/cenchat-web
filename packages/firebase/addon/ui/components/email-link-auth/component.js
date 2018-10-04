import Component from '@ember/component';

import firebase from 'firebase';
import toast from '@cenchat/elements/utils/toast';

import layout from './template';

/**
 * @class EmailLinkAuth
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
   * @type {boolean}
   */
  isSignInWithEmailLink: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.args.firebase.auth().isSignInWithEmailLink(window.location.href)) {
      this.set('isSignInWithEmailLink', true);
    }
  },

  /**
   * @param {string} email
   * @param {string} displayName
   * @function
   */
  async handleEmailLinkSignInClick(email, displayName) {
    try {
      if (this.args.session.get('currentUser.isAnonymous')) {
        await this.convertAnonymousToPermanentAccount(email, displayName);
      } else {
        await this.args.session.open('firebase', { displayName, email, type: 'emailLink' });
      }

      if (this.args.redirectUrl) {
        window.location.replace(this.args.redirectUrl);
      } else {
        this.args.router.transitionTo('chats');
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        toast('Invalid email');
      } else if (error.code === 'auth/invalid-action-code') {
        toast('Invalid sign in link');
      } else {
        console.log(error);
        toast('Couldn\'t sign in. Try again later.');
      }
    }
  },

  /**
   * @function
   */
  async handleContinueAnonymouslyClick() {
    await this.args.session.open('firebase', { type: 'anonymous' });
  },

  /**
   * @param {string} email
   * @param {string} displayName
   * @return {firebase.auth.User} Firebase user
   * @function
   */
  async convertAnonymousToPermanentAccount(email, displayName) {
    const auth = this.args.firebase.auth();
    const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
      email,
      window.location.href,
    );
    const linkAuthResult = await auth.currentUser.linkAndRetrieveDataWithCredential(credential);

    localStorage.removeItem('cenchatEmailForSignIn');

    await linkAuthResult.user.updateProfile({ displayName });
    await this.updateSessionRecord(displayName);

    return linkAuthResult.user;
  },

  /**
   * @param {string} displayName
   * @function
   */
  async updateSessionRecord(displayName) {
    const db = this.args.firebase.firestore();

    await db.doc(`users/${this.args.session.get('model.id')}`).update({
      displayName,
      name: displayName.toLowerCase(),
    });
  },
});
