import { inject } from '@ember/service';
import Controller from '@ember/controller';

/**
 * @class SitesIndex
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  router: inject(),
});
