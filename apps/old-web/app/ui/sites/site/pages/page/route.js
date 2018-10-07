import Route from '@ember/routing/route';

/**
 * @class SitesSitePagesPage
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model(params) {
    return this.store.findRecord('page', params.page_id);
  },
});
