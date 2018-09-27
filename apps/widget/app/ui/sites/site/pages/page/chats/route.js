import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSitePagesPageChats
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
  beforeModel() {
    this.store.subscribe(() => this.refresh(), this.routeName);
  },

  /**
   * @override
   */
  async model(params) {
    await this.listenForModelChanges(params);

    if (this.previousUnsubscribeModelListener) {
      this.previousUnsubscribeModelListener();
    }

    this.set('previousUnsubscribeModelListener', this.currentUnsubscribeModelListener);

    return this.fetchModel(params);
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves with the Firestore QuerySnapshot
   * @function
   */
  listenForModelChanges(params) {
    return new Promise((resolve) => {
      const db = this.firebase.firestore();
      const page = this.modelFor('sites.site.pages.page');
      const pageDocRef = db.doc(`pages/${page.id}`);
      const chatLimit = parseInt(params.chatLimit, 10) || 12;
      const unsubscribe = db
        .collection('chats')
        .where('page', '==', pageDocRef)
        .orderBy('lastActivityTimestamp', 'desc')
        .limit(chatLimit)
        .onSnapshot((querySnapshot) => {
          const batch = this.store.batch();

          querySnapshot.forEach(docSnapshot => batch.set('chat', docSnapshot));

          if (this.currentUnsubscribeModelListener === this.previousUnsubscribeModelListener) {
            batch.commit();
          } else {
            batch.commit({ isBackgroundOperation: true });
          }

          resolve();
        }, () => resolve([]));

      this.set('currentUnsubscribeModelListener', unsubscribe);
    });
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves with the chats
   * @function
   */
  fetchModel(params) {
    const db = this.firebase.firestore();

    return this.store.query('chat', {
      fetch: async () => {
        const page = this.modelFor('sites.site.pages.page');
        const pageDocRef = db.doc(`pages/${page.id}`);
        const chatLimit = parseInt(params.chatLimit, 10) || 12;
        const querySnapshot = await db
          .collection('chats')
          .where('page', '==', pageDocRef)
          .orderBy('lastActivityTimestamp', 'desc')
          .limit(chatLimit)
          .get();

        return querySnapshot.docs;
      },

      include: {
        creator: chat => db.doc(`users/${chat.creator}`).get(),

        lastMessage: chat => (
          this.store.get('message', chat.lastMessage, {
            fetch: () => db.doc(`messages/${chat.lastMessage}`).get(),

            include: {
              author: message => db.doc(`users/${message.author}`).get(),
            },
          })
        ),
      },
    });
  },
});
