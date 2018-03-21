import Route from '@ember/routing/route';

/**
 * @class SitesSiteIndex
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
