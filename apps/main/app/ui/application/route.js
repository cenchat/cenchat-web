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
        const model = await this.store.findRecord('user', session.get('currentUser.uid'));

        session.set('content.model', model);

        this.setupPushNotification(model);
        await this.updateFacebookInfo(model);
      } catch (error) {
        session.close();
      }
    }
  },

  /**
   * @param {Model.User} profile
   * @function
   * @private
   */
  async setupPushNotification(profile) {
    if (!this.fastboot.isFastBoot && 'serviceWorker' in navigator) {
      const messaging = this.firebase.messaging();

      try {
        await messaging.requestPermission();

        messaging.onTokenRefresh(async () => {
          const token = await messaging.getToken();
          const meta = await profile.get('metaInfo');
          const notificationTokens = meta.get('notificationTokens');

          if (!Array.isArray(notificationTokens)) {
            meta.set('notificationTokens', [token]);
          } else if (!notificationTokens.includes(token)) {
            meta.set('notificationTokens', [...meta.get('notificationTokens'), token]);
          }

          await meta.save();
        });

        const token = await messaging.getToken();
        const meta = await profile.get('metaInfo');
        const notificationTokens = meta.get('notificationTokens');

        if (!Array.isArray(notificationTokens)) {
          meta.set('notificationTokens', [token]);
        } else if (!notificationTokens.includes(token)) {
          meta.set('notificationTokens', [...meta.get('notificationTokens'), token]);
        }

        await meta.save();
      } catch (error) {
        // Do nothing
      }
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
  isFacebookInfoOutdated(profile) {
    const facebookProviderData = this.getFacebookProviderData();

    return profile.get('photoUrl') !== facebookProviderData.photoURL;
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

    profile.set('photoUrl', facebookProviderData.photoURL);

    return Promise.all([
      profile.save(),
      currentUser.updateProfile({ photoURL: profile.get('photoUrl') }),
    ]);
  },

  /**
   * @param {Model.User} profile
   * @function
   * @private
   */
  async updateFacebookAccessToken(profile) {
    const meta = await profile.get('metaInfo');

    if (meta.get('accessToken') && meta.get('accessToken.facebook')) {
      const facebookAccessToken = meta.get('accessToken.facebook');

      try {
        const credential = firebase.auth.FacebookAuthProvider.credential(facebookAccessToken);
        const authData = await this.firebase.auth().signInAndRetrieveDataWithCredential(credential);

        meta.set('accessToken.facebook', authData.credential.accessToken);
      } catch (error) {
        meta.set('accessToken.facebook', null);
      }

      await meta.save();
    }
  },

  /**
   * @param {Model.User} profile
   * @function
   * @private
   */
  async updateFacebookInfo(profile) {
    if (profile.get('provider') && profile.get('provider.facebook')) {
      if (this.isFacebookInfoOutdated(profile)) {
        await this.updateCurrentUserProfile(profile);
      }

      await this.updateFacebookAccessToken(profile);
    }
  },

  actions: {
    /**
     * @override
     */
    didTransition(...args) {
      this._super(...args);

      if (!this.fastboot.isFastBoot && !this.isSplashScreenRemoved) {
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
