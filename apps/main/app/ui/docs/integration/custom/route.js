import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class DocsIntegrationCustom
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
    this.set('headData.title', 'Integration Cenchat in a custom website – Documentation – Cenchat');
    this.set('headData.description', 'This is the universal way to integrate Cenchat to any type of website.');
    this.set('headData.url', 'https://cenchat.com/docs/integration/custom');
  },
});
