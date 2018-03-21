import Route from '@ember/routing/route';

/**
 * @class SitesSite
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model(params) {
    return this.get('store').findRecord('site', params.site_id);
  },
});
