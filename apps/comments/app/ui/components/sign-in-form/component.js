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
        signInSuccessWithAuthResult: () => {
          this.getOrCreateCurrentUserRecord();
        },
      },
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes: ['public_profile', 'user_friends'],
        },
      ],
      tosUrl: 'https://cenchat.com/about/terms',
    });
  },

  /**
   * @function
   * @private
   */
  async getOrCreateCurrentUserRecord() {
    const session = this.get('session');

    try {
      await session.fetch();

      let user;

      try {
        user = await this.get('store').findRecord('user', session.get('currentUser.uid'));
      } catch (error) {
        if (error.message === 'Document doesn\'t exist') {
          user = await this.createCurrentUserRecord();
        } else {
          throw new Error();
        }
      }

      session.set('content.model', user);

      toast(`Signed in as ${user.get('displayName')}`);
    } catch (e) {
      toast('Couldn\'t sign in. Please try again.');
      session.close();
    }
  },

  /**
   * @return {Model.User} Created user record
   * @function
   * @private
   */
  async createCurrentUserRecord() {
    const session = this.get('session');
    const store = this.get('store');
    const currentUser = session.get('currentUser');
    const record = store.createRecord('user', {
      id: currentUser.uid,
      displayName: currentUser.displayName,
      displayUsername: null,
      facebookId: null,
      photoUrl: currentUser.photoURL,
      username: null,
    });

    for (const provider of currentUser.providerData) {
      if (provider.providerId.includes('facebook')) {
        record.set('facebookId', provider.uid);

        break;
      }
    }

    await record.save({
      adapterOptions: {
        include(batch, db) {
          batch.set(db.collection('userMetaInfos').doc(currentUser.uid), {
            facebookAccessToken: null,
            hasNewNotification: false,
          });

          if (record.get('facebookId')) {
            batch.set(db.collection('facebookIds').doc(record.get('facebookId')), {
              cloudFirestoreReference: db.collection('users').doc(currentUser.uid),
            });
          }
        },
      },
    });

    return record;
  },
});
