import RSVP from 'rsvp';
import Route from '@ember/routing/route';

/**
 * @class SitesSitePages
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model() {
    const site = this.modelFor('sites.site');

    return RSVP.hash({ site, pages: site.get('pages') });
  },
});
