import { inject } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSite
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
    const { site_id: siteId } = this.paramsFor(this.routeName);

    if (!await this.get('session.model').isSiteAdmin(siteId)) {
      this.transitionTo('home');
    }
  },

  /**
   * @override
   */
  model({ site_id: siteId }) {
    return this.store.findRecord('site', siteId);
  },
});
