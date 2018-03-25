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
      }).catch((error) => {
        // TODO: error.code should be used by Cloud Firestore doesn't
        // use it. Replace this once they do.
        if (error.message === 'Document doesn\'t exist') {
          const currentUser = session.get('currentUser');
          const record = store.createRecord('user', {
            id: currentUser.uid,
            displayName: currentUser.displayName,
            photoUrl: currentUser.photoURL,
          });

          for (const provider of currentUser.providerData) {
            if (provider.providerId.includes('facebook')) {
              record.set('facebookId', provider.uid);

              break;
            }
          }

          return record.save({
            adapterOptions: { onServer: true },
          }).then(() => {
            session.set('content.model', record);
          });
        } else {
          return session.close();
        }
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
  },
});
