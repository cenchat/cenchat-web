import Route from '@ember/routing/route';

/**
 * @class SignIn
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  beforeModel() {
    if (this.get('session.model')) {
      this.transitionTo('home');
    }
  },
});
