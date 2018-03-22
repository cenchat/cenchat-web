import { inject } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Application
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   * @readonly
   */
  session: inject(),

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
  afterModel() {
    const session = this.get('session');
    const store = this.get('store');

    if (session.get('isAuthenticated')) {
      return store.findRecord(
        'user',
        session.get('currentUser.uid'),
      ).then((model) => {
        session.set('content.model', model);

        return this.updateProfile(model);
      }).catch((e) => {
        const currentUser = session.get('currentUser');
        const record = store.createRecord('user', {
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL,
        });

        return record.save({ adapterOptions: { onServer: true } }).then(() => {
          session.set('content.model', record);
        });
      });
    }
  },

  /**
   * Updates the signed in user's profile based on their Facebook data
   *
   * @param {Model.User} profile
   * @return {Promise} Resolves after successful save
   */
  updateProfile(profile) {
    let willSave = false;

    for (const provider of this.get('session.currentUser.providerData')) {
      const providerId = provider.providerId;

      if (
        providerId.includes('facebook')
        && profile.get('displayName') !== provider.displayName
        || profile.get('photoUrl') !== provider.photoURL
      ) {
        willSave = true;
        profile.set('displayName', provider.displayName);
        profile.set('photoUrl', provider.photoURL);
        break;
      }
    }

    if (willSave) {
      return profile.save();
    }
  },
});
