import { inject } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import Route from '@ember/routing/route';

import firebase from 'firebase';

/**
 * @class Application
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  fastboot: inject(),

  /**
   * @type {Ember.Service}
   */
  firebase: inject(),

  /**
   * @override
   */
  beforeModel() {
    const session = this.get('session');

    return session.fetch().catch(() => {});
  },

  /**
   * @override
   */
  async afterModel() {
    const session = this.get('session');

    if (session.get('isAuthenticated')) {
      try {
        const model = await this.get('store').findRecord('user', session.get('currentUser.uid'));

        session.set('content.model', model);

        const promises = [this.updateFacebookAccessToken(model)];

        if (this.isCurrentUserProfileOutdated(model)) {
          promises.push(this.updateCurrentUserProfile(model));
        }

        return Promise.all(promises);
      } catch (error) {
        session.close();
      }
    }

    return null;
  },

  /**
   * @param {Model.User} profile
   * @function
   * @private
   */
  async updateFacebookAccessToken(profile) {
    const meta = await profile.get('metaInfo');

    if (meta.get('facebookAccessToken')) {
      const credential = firebase
        .auth
        .FacebookAuthProvider
        .credential(meta.get('facebookAccessToken'));
      const authData = await this.get('firebase')
        .auth()
        .signInAndRetrieveDataWithCredential(credential);

      meta.set('facebookAccessToken', authData.credential.accessToken);

      await meta.save();
    }
  },

  /**
   * @return {Object|null} Facebook provider data or null if not available
   * @function
   * @private
   */
  getFacebookProviderData() {
    const currentUser = this.get('session.currentUser');

    for (const provider of currentUser.providerData) {
      if (provider.providerId.includes('facebook')) {
        return provider;
      }
    }

    return null;
  },

  /**
   * @param {Model.User} profile
   * @return {boolean} True if outdated. Otherwise, false.
   * @function
   * @private
   */
  isCurrentUserProfileOutdated(profile) {
    const facebookProviderData = this.getFacebookProviderData();

    if (
      profile.get('facebookId') !== facebookProviderData.uid
      || profile.get('displayName') !== facebookProviderData.displayName
      || profile.get('photoUrl') !== facebookProviderData.photoURL
    ) {
      return true;
    }

    return false;
  },

  /**
   * @param {Model.User} profile
   * @return {Promise} Resolves after successful save
   * @function
   * @private
   */
  updateCurrentUserProfile(profile) {
    const currentUser = this.get('session.currentUser');
    const facebookProviderData = this.getFacebookProviderData();

    profile.set('facebookId', facebookProviderData.uid);
    profile.set('displayName', facebookProviderData.displayName);
    profile.set('photoUrl', facebookProviderData.photoURL);

    return Promise.all([
      profile.save({
        adapterOptions: {
          include(batch, db) {
            const changedAttributes = profile.changedAttributes();

            if (changedAttributes.facebookId) {
              const [previousFacebookId, currentFacebookId] = changedAttributes.facebookId;

              batch.set(db.collection('facebookIds').doc(currentFacebookId), {
                cloudFirestoreReference: db.collection('users').doc(profile.get('id')),
              });

              if (previousFacebookId) {
                batch.delete(db.collection('facebookIds').doc(previousFacebookId));
              }
            }
          },
        },
      }),
      currentUser.updateProfile({
        displayName: profile.get('displayName'),
        photoURL: profile.get('photoUrl'),
      }),
    ]);
  },

  actions: {
    /**
     * @override
     */
    didTransition(...args) {
      this._super(...args);

      if (!this.get('fastboot.isFastBoot') && !this.get('isSplashScreenRemoved')) {
        scheduleOnce('afterRender', () => {
          const splashScreenElement = document.querySelector('.splash-screen');

          if (splashScreenElement) {
            document.body.removeChild(splashScreenElement);
          }

          this.set('isSplashScreenRemoved', true);
        });
      }
    },
  },
});
