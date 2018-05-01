import Route from '@ember/routing/route';

/**
 * @class SitesSiteManage
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model() {
    return this.modelFor('sites.site');
  },
});
