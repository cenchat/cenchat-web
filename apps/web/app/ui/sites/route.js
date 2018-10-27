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
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  beforeModel() {
    this.store.subscribe(() => this.refresh(), this.routeName);
  },

  /**
   * @override
   */
  model() {
    const db = this.firebase.firestore();

    return this.store.query('site', {
      fetch: async () => {
        const sitesQuerySnapshot = await db.collection(`users/${this.get('session.model.id')}/sitesAsAdmin`).get();

        return Promise.all(sitesQuerySnapshot.docs.map(siteDocSnapshot => (
          siteDocSnapshot.get('cloudFirestoreReference').get()
        )));
      },
    });
  },
});
