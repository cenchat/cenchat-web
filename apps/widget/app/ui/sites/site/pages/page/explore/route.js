import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSitePagesPageExplore
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
  queryParams: {
    chatLimit: { as: 'chat_limit', refreshModel: true },
  },

  /**
   * @override
   */
  model(params) {
    const db = this.firebase.firestore();

    return this.store.query('chat', {
      fetch: async () => {
        const page = this.modelFor('sites.site.pages.page');
        const pageDocRef = db.doc(`pages/${page.id}`);
        const chatLimit = parseInt(params.chatLimit, 10) || 12;
        const querySnapshot = await db
          .collection('chats')
          .where('page', '==', pageDocRef)
          .where('isPublicized', '==', true)
          .orderBy('lastActivityTimestamp', 'desc')
          .limit(chatLimit)
          .get();

        return querySnapshot.docs;
      },

      include: {
        creator: record => db.doc(`users/${record.creator}`).get(),
      },
    });
  },
});
