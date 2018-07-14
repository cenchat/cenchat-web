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
});
