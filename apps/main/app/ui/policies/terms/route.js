import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class PoliciesTerms
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
    this.set('headData.title', 'Terms of Service – Policies – Cenchat');
    this.set('headData.description', 'These Terms of Service (“Terms”) are a contract between you and Cenchat. They govern your use of Cenchat’s sites, services, mobile apps, products, and content (“Services”).');
    this.set('headData.url', 'https://cenchat.com/policies/terms');
  },
});
