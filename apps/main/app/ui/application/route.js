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
      }).catch((error) => {
        return session.close();
      });
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
