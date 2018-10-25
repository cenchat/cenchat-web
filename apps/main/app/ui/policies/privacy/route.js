import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class PoliciesPrivacy
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
    this.set('headData.title', 'Privacy Policy – Policies – Cenchat');
    this.set('headData.description', 'This policy explains what information we collect when you use Cenchat\'s sites and services. It also has information how we receive that information, and what we do with it once we have it.');
    this.set('headData.url', 'https://cenchat.com/policies/privacy');
  },
});
