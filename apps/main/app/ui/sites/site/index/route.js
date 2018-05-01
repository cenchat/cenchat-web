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

  /**
   * @override
   */
  afterModel(model, { targetName }) {
    if (
      model.get('isVerified')
      && (targetName.includes('approved') || targetName.includes('rejected'))
    ) {
      return this.transitionTo(targetName);
    }

    return this.transitionTo('sites.site.index.approved-comments');
  },
});
