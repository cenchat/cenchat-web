import Route from '@ember/routing/route';

/**
 * @class SitesSiteIndexApprovedComments
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model() {
    const site = this.modelFor('sites.site.index');

    return site.get('approvedComments');
  },
});
