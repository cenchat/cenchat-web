import { inject } from '@ember/service';
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

        return Promise.all([
          this.updateFacebookAccessToken(model),
          this.updateProfile(model),
        ]);
      } catch (error) {
        session.close();
      }
    }

    return null;
  },

  /**
   * Updates the Facebook access token
   *
   * @param {Model.User} profile
   */
  async updateFacebookAccessToken(profile) {
    const meta = await profile.getMetaInfo();

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
   * Updates the signed in user's profile based on their Facebook data
   *
   * @param {Model.User} profile
   * @return {Promise} Resolves after successful save
   */
  updateProfile(profile) {
    const currentUser = this.get('session.currentUser');
    let willSave = false;

    for (const provider of currentUser.providerData) {
      if (
        provider.providerId.includes('facebook')
        && (
          profile.get('facebookId') !== provider.uid
          || profile.get('displayName') !== provider.displayName
          || profile.get('photoUrl') !== provider.photoURL
        )
      ) {
        willSave = true;
        profile.set('facebookId', provider.uid);
        profile.set('displayName', provider.displayName);
        profile.set('photoUrl', provider.photoURL);

        break;
      }
    }

    if (willSave) {
      return Promise.all([
        profile.save({
          adapterOptions: { onServer: true },
        }),
        currentUser.updateProfile({
          displayName: profile.get('displayName'),
          photoURL: profile.get('photoUrl'),
        }),
      ]);
    }

    return Promise.resolve();
  },

  actions: {
    /**
     * @override
     */
    loading(transition, ...args) {
      this._super(transition, args);

      const progressBar = document.createElement('div');

      progressBar.id = 'progress-bar';
      progressBar.className = 'progress-bar';
      progressBar.setAttribute('role', 'progressbar');
      progressBar.setAttribute('aria-valuetext', 'Loading page');
      document.querySelector('body').appendChild(progressBar);

      transition.promise.finally(() => {
        progressBar.remove();
      });
    },
  },
});
