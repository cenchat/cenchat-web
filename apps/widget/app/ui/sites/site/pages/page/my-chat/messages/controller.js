import Controller from '@ember/controller';

/**
 * @class SitesSitePagesPageMyChatMessages
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @override
   */
  queryParams: ['messageLimit'],

  /**
   * @type {string|number}
   */
  messageLimit: null,

  /**
   * @function
   */
  handleScrollToTop() {
    const messageLimit = parseInt(this.messageLimit, 10) || 12;

    if (this.model.length >= messageLimit) {
      this.set('messageLimit', messageLimit + 6);
    }
  },
});
