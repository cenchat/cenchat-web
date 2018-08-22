import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

/**
 * @class Firebase
 * @namespace ToriiAdapter
 * @extends EmberObject
 */
export default EmberObject.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @param {firebase.User} currentUser
   * @return {Promise}
   */
  async open(currentUser) {
    const db = this.firebase.firestore();
    const currentUserDocSnapshot = await db.doc(`users/${currentUser.uid}`).get();

    if (currentUserDocSnapshot.exists) {
      return {
        currentUser,
        model: await this.store.get('user', currentUser.uid, {
          fetch() {
            return Promise.resolve(currentUserDocSnapshot);
          },
        }),
      };
    }

    await this.createUserRecord(currentUser);

    return {
      currentUser,
      model: await this.store.get('user', currentUser.uid),
    };
  },

  /**
   * @return {Promise}
   * @function
   */
  fetch() {
    return new Promise((resolve, reject) => {
      const auth = this.firebase.auth();

      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve({ currentUser: user });
        } else {
          auth.getRedirectResult().then((result) => {
            if (result.user) {
              resolve({ currentUser: result.user });
            } else {
              reject(new Error('No session available'));
            }
          }).catch((error) => {
            reject(new Error(error));
          });
        }
      });
    });
  },

  /**
   * @return {Promise} Resolves when successfully signed out
   * @function
   */
  close() {
    return this.firebase.auth().signOut();
  },

  /**
   * @param {firebase.User} currentUser
   * @private
   * @function
   */
  async createUserRecord(currentUser) {
    const { displayName } = currentUser;
    const db = this.firebase.firestore();
    const batch = db.batch();

    batch.set(db.doc(`users/${currentUser.uid}`), {
      displayName,
      displayUsername: null,
      name: displayName ? displayName.toLowerCase() : null,
      photoUrl: null,
      provider: null,
      shortBio: null,
      username: null,
    });
    batch.set(db.doc(`userMetaInfos/${currentUser.uid}`), {
      accessToken: null,
      hasNewNotification: false,
      notificationTokens: null,
    });

    await batch.commit();

    this.store.set('user', {
      displayName,
      id: currentUser.uid,
      displayUsername: null,
      name: displayName ? displayName.toLowerCase() : null,
      photoUrl: null,
      provider: null,
      shortBio: null,
      username: null,
      metaInfo: {
        id: currentUser.uid,
        accessToken: null,
        hasNewNotification: false,
        notificationTokens: null,
      },
    });
  },
});
