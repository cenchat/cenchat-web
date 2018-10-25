import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class PoliciesRules
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
    this.set('headData.title', 'Rules – Policies – Cenchat');
    this.set('headData.description', 'Cenchat\'s goal is to provide a chat based communication tool for a website\'s audience while maintaining thoughtful and civil dialogue.');
    this.set('headData.url', 'https://cenchat.com/policies/rules');
  },
});
