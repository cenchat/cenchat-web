import { inject } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesIndexNew
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @override
   */
  async beforeModel() {
    const user = this.get('session.model');
    const betaTester = await user.get('betaTester');

    try {
      if (betaTester.get('status') !== 'approved') {
        this.transitionTo('sites.index');
      }
    } catch (error) {
      this.transitionTo('sites.index');
    }
  },
});
