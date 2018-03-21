import Route from '@ember/routing/route';

/**
 * @class Home
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  beforeModel() {
    const user = this.get('session.model');

    if (user) {
      const id = user.get('username') ? user.get('username') : user.get('id');

      this.transitionTo('profile', id);
    }
  },
});
