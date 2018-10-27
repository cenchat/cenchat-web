import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class DocsVerifySite
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
    this.set('headData.title', 'Verify your website – Documentation – Cenchat');
    this.set('headData.description', 'Before integrating Cenchat, we first need to make sure that you own the website.');
    this.set('headData.url', 'https://cenchat.com/docs/verify-site');
  },
});
