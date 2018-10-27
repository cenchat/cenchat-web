import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class DocsIntegrationIndex
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  headData: service('headData'),

  /**
   * @override
   */
  async afterModel() {
    this.set('headData.title', 'Integrate Cenchat to your website – Documentation – Cenchat');
    this.set('headData.description', 'Choose the integration method below that fits your website');
    this.set('headData.url', 'https://cenchat.com/docs/integration');
  },
});
