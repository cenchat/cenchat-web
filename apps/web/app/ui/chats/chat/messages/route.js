import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class ChatsChatMessages
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
    messageLimit: {
      as: 'message_limit',
      refreshModel: true,
    },
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
      const messageLimit = parseInt(params.messageLimit, 10) || 12;
      const db = this.firebase.firestore();
      const chat = this.modelFor('chats.chat');
      const chatDocRef = db.doc(`chats/${chat.id}`);
      const unsubscribe = db
        .collection('messages')
        .where('chat', '==', chatDocRef)
        .orderBy('createdOn', 'desc')
        .limit(messageLimit)
        .onSnapshot((querySnapshot) => {
          const batch = this.store.batch();

          querySnapshot.forEach(docSnapshot => batch.set('message', docSnapshot));

          if (this.currentUnsubscribeModelListener === this.previousUnsubscribeModelListener) {
            batch.commit();
          } else {
            batch.commit({ isBackgroundOperation: true });
          }

          resolve();
        }, () => resolve());

      this.set('currentUnsubscribeModelListener', unsubscribe);
    });
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves with the messages
   * @function
   */
  fetchModel(params) {
    const db = this.firebase.firestore();

    return this.store.query('message', {
      fetch: async () => {
        const chat = this.modelFor('chats.chat');
        const chatDocRef = db.doc(`chats/${chat.id}`);
        const messageLimit = parseInt(params.messageLimit, 10) || 12;
        const querySnapshot = await db
          .collection('messages')
          .where('chat', '==', chatDocRef)
          .orderBy('createdOn', 'desc')
          .limit(messageLimit)
          .get();

        return querySnapshot.docs;
      },

      include: {
        author: record => db.doc(`users/${record.author}`).get(),
      },
    });
  },
});
