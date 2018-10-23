import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSiteRoles
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
  beforeModel() {
    this.store.subscribe(() => this.refresh(), this.routeName);
  },

  /**
   * @override
   */
  async model() {
    const db = this.firebase.firestore();
    const { site_id: siteId } = this.paramsFor('sites.site');

    return this.store.get('site', siteId, {
      fetch: () => this.firebase.firestore().doc(`sites/${siteId}`).get(),

      include: {
        admins: async (site) => {
          const adminQuerySnapshot = await db.collection(`sites/${site.id}/admins`).get();

          return Promise.all(
            adminQuerySnapshot.docs.map(doc => doc.get('cloudFirestoreReference').get()),
          );
        },
      },
    });
  },

  /**
   * @override
   */
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('usersWithRole', model.admins);
  },
});
