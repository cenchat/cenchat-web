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
  beforeModel() {
    const user = this.modelFor('sites.index');

    return this.get('store').findRecord(
      'betaTester',
      user.get('id'),
    ).then((betaTester) => {
      if (betaTester.get('status') !== 'approved') {
        this.transitionTo('sites.index');
      }
    }).catch((error) => {
      this.transitionTo('sites.index');
    });
  },

  /**
   * @override
   */
  model() {
    return this.modelFor('sites.index');
  },
});
