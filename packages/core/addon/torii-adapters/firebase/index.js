import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

/**
 * @class Application
 * @namespace ToriiAdapter
 * @extends EmberObject
 */
export default EmberObject.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service(),

  /**
   * @type {Ember.Service}
   */
  store: service(),

  /**
   * @param {firebase.User} currentUser
   * @return {Promise}
   */
  async open(currentUser) {
    let model;

    try {
      const record = await this.store.findRecord('user', currentUser.uid);

      model = record;
    } catch (error) {
      const record = this.store.createRecord('user', {
        id: currentUser.uid,
        displayName: currentUser.displayName,
        displayUsername: null,
        name: currentUser.displayName.toLowerCase(),
        photoUrl: null,
        provider: {},
        shortBio: null,
        username: null,
      });

      await record.save({
        adapterOptions: {
          include(batch, db) {
            // Workaround since an empty object with batch.set() with merge: true is bugged
            batch.update(db.collection('users').doc(currentUser.uid), {
              provider: {},
            });
            batch.set(db.collection('userMetaInfos').doc(currentUser.uid), {
              accessToken: {},
              hasNewNotification: false,
              notificationTokens: [],
            });
          },
        },
      });

      model = record;
    }

    return { currentUser, model };
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
});
