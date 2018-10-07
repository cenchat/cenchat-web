import Component from '@ember/component';

import layout from './template';

/**
 * @class ChatComposerSubToolbar
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

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
