import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSitePagesPageAccount
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  model(params) {
    return this.store.get('user', params.user_id);
  },
});
