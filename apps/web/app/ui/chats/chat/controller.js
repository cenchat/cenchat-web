import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import createChatMessage from '@cenchat/core/utils/create-chat-message';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class ChatsChat
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
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
   * @type {boolean}
   */
  isPrivacyFormVisible: false,

  /**
   * @function
   */
  handlePrivacyClick() {
    this.set('isPrivacyFormVisible', !this.isPrivacyFormVisible);
  },

  /**
   * @param {Object} chat
   * @function
   */
  async handlePrivacyFormSubmit(chat) {
    const db = this.firebase.firestore();

    await db.doc(`chats/${this.model.id}`).update(chat);
    this.store.update('chat', this.model.id, chat);
    this.set('isPrivacyFormVisible', false);
    toast('Privacy updated');
  },

  /**
   * @param {string} content
   * @param {string} type
   * @function
   */
  async handleSendMessageClick(content, type) {
    await createChatMessage(
      this.model,
      content,
      type,
      this.get('session.model.id'),
      this.firebase.firestore(),
      this.store,
    );
  },
});
