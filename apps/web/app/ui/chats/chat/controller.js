import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import createChatMessage from '@cenchat/core/utils/create-chat-message';

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
