import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SignIn
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @override
   */
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      window.location.replace('https://cenchat.com');
    }
  },
});
