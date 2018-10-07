import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Profile
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  beforeModel() {
    this.store.subscribe(() => this.refresh(), this.routeName);
  },

  /**
   * @override
   */
  async model() {
    return this.get('session.model');
  },
});
