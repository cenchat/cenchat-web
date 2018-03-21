import { inject } from '@ember/service';
import Controller from '@ember/controller';

/**
 * @class Docs
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  router: inject(),
});
