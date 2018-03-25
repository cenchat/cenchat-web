import Route from '@ember/routing/route';

/**
 * @class ProfileOwnerRoute
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  beforeModel() {
    if (this.modelFor('profile').get('id') !== this.get('session.model.id')) {
      this.transitionTo('profile');
    }
  },
});
