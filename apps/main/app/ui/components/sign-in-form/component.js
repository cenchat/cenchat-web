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
        signInSuccessWithAuthResult: ({ credential, user }) => {
          this.fetchOrCreateUserRecord(user, credential);
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
   * @param {firebase.User} currentUser
   * @param {firebase.auth.AuthCredential} credential
   * @function
   * @private
   */
  async fetchOrCreateUserRecord(currentUser, credential) {
    const session = this.get('session');
    let user;

    try {
      await session.fetch();

      const store = this.get('store');

      try {
        user = await store.findRecord('user', currentUser.uid);
      } catch (e) {
        user = store.createRecord('user', {
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL,
        });

        for (const provider of currentUser.providerData) {
          if (provider.providerId.includes('facebook')) {
            user.set('facebookId', provider.uid);

            break;
          }
        }

        await user.save({
          adapterOptions: {
            include(batch, db) {
              batch.set(db.collection('userMetaInfos').doc(currentUser.uid), {
                facebookAccessToken: null,
                hasNewNotification: false,
                notificationTokens: [],
              });

              if (user.get('facebookId')) {
                batch.set(db.collection('facebookIds').doc(user.get('facebookId')), {
                  cloudFirestoreReference: db.collection('users').doc(currentUser.uid),
                });
              }
            },
          },
        });
      }

      if (credential) {
        await this.saveFacebookAccessToken(user, credential);
      }

      session.set('content.model', user);
      this.get('router').transitionTo('profile', user.get('id'));
      toast(`Signed in as ${user.get('displayName')}`);
    } catch (e) {
      toast('Couldn\'t sign in. Please try again.');
    }
  },

  /**
   * @param {Model.User} user
   * @param {Object} credential
   * @function
   * @private
   */
  async saveFacebookAccessToken(user, credential) {
    const meta = await user.get('metaInfo');

    meta.set('facebookAccessToken', credential.accessToken);

    await meta.save();
  },

  /**
   * @function
   */
  showAdditionalInfo() {
    toast(
      'We collect your name, email, and photo in order for us and other Cenchat users to identify you. In addition, we also collect your friend list. This is only used to give you suggestions on who to follow.',
      20000,
    );
  },
});
