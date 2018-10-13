import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

import firebase from 'firebase';

/**
 * @class ChatsChat
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
    return this.store.get('chat', params.chat_id, {
      fetch: () => this.firebase.firestore().doc(`chats/${params.chat_id}`).get(),
    });
  },

  /**
   * @override
   */
  async afterModel(model) {
    if (this.get('session.model.metaInfo.unreadChats').includes(model.id)) {
      // TODO: Remove chat from unreadChats
      const db = this.firebase.firestore();
      const currentUserId = this.get('session.model.id');

      await db.doc(`userMetaInfos/${currentUserId}`).update({
        unreadChats: firebase.firestore.FieldValue.arrayRemove(model.id),
      });
    }
  },

  /**
   * @override
   */
  redirect(model, transition) {
    if (transition.targetName === 'chats.chat.index') {
      this.transitionTo('chats.chat.messages');
    }
  },
});
