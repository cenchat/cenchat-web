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
  session: service('session'),

  /**
   * @override
   */
  beforeModel() {
    if (this.get('session.isAuthenticated') && !this.get('session.currentUser.isAnonymous')) {
      window.location.replace('https://cenchat.com');
    }
  },
});
