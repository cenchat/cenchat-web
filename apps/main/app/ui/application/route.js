import Route from '@ember/routing/route';

/**
 * @class Application
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
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

    if (session.get('isAuthenticated')) {
      return this.get('store').findRecord(
        'user',
        session.get('currentUser.uid'),
      ).then((model) => {
        session.set('content.model', model);

        return this.updateProfile(model);
      }).catch((error) => {
        return session.close();
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
          profile.get('displayName') !== provider.displayName
          || profile.get('photoUrl') !== provider.photoURL
        )
      ) {
        willSave = true;
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
