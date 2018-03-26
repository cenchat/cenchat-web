import Route from '@ember/routing/route';

/**
 * @class SitesIndexNew
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  async beforeModel() {
    const user = this.modelFor('sites.index');
    const betaTester = await this.get('store').findRecord('betaTester', user.get('id'));

    try {
      if (betaTester.get('status') !== 'approved') {
        this.transitionTo('sites.index');
      }
    } catch (error) {
      this.transitionTo('sites.index');
    }
  },

  /**
   * @override
   */
  model() {
    return this.modelFor('sites.index');
  },
});
