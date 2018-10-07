import Route from '@ember/routing/route';

/**
 * @class ProfileSettings
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model() {
    return this.modelFor('profile');
  },
});
