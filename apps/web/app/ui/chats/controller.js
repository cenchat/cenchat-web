import Controller from '@ember/controller';

/**
 * @class Chats
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @override
   */
  queryParams: ['chatLimit'],

  /**
   * @type {number|string}
   */
  chatLimit: null,

  /**
   * @function
   */
  handleLoadMoreChatsClick() {
    const chatLimit = parseInt(this.chatLimit, 10) || 12;

    this.set('chatLimit', chatLimit + 6);
  },
});
