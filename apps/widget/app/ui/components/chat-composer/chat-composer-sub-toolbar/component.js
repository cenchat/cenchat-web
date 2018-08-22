import Component from '@ember/component';

/**
 * @class ChatComposerSubToolbar
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @param {string} action
   * @function
   */
  handleToolbarActionClick(action) {
    this.set('selectedToolbar', action);
  },
});
