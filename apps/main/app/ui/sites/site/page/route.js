import Route from '@ember/routing/route';

/**
 * @class SitesSitePage
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model(params) {
    return this.get('store').findRecord('page', params.page_id);
  },
});
