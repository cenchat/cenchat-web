import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class DocsIndex
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
    this.set('headData.title', 'Documentations – Cenchat');
    this.set('headData.description', 'Setting up Cenchat for your website is just an easy 3-step process and it should only take a few minutes to get it up and running:');
    this.set('headData.url', 'https://cenchat.com/docs');
  },
});
