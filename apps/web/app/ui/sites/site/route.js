import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Sites
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  model(params) {
    return this.store.get('site', params.site_id, {
      fetch: () => this.firebase.firestore().doc(`sites/${params.site_id}`).get(),
    });
  },
});
