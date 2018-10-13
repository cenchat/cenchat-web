import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSite
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
  model(params) {
    const db = this.firebase.firestore();

    return this.store.get('site', params.site_id, {
      fetch: () => db.doc(`sites/${params.site_id}`).get(),

      include: {
        admins: async (record) => {
          if (this.get('session.isAuthenticated')) {
            const currentUser = this.get('session.model') || {};

            try {
              const docSnapshot = await db.doc(`sites/${record.id}/admins/${currentUser.id}`).get();

              if (docSnapshot.exists) {
                return [await docSnapshot.get('cloudFirestoreReference').get()];
              }
            } catch (error) {
              return [];
            }
          }

          return [];
        },
      },
    });
  },

  /**
   * @override
   */
  afterModel(model) {
    document.body.classList.remove('light-theme');
    document.body.classList.add(`${model.theme}-theme`);
    document.documentElement.style.setProperty('--brand-color', model.brandColor);
  },
});
