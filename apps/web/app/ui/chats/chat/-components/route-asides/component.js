import Component from '@ember/component';

/**
 * @class ChatsChatRouteAsides
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isPageLinkVisible: true,

  /**
   * @function
   */
  handleHidePageLinkClick() {
    this.set('isPageLinkVisible', false);
  },
});
