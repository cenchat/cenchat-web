import Component from '@ember/component';

import layout from './template';

/**
 * @class ChatComposerMainToolbar
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
   * @type {boolean}
   */
  isSubToolbarVisible: false,

  /**
   * @function
   */
  async handleSendMessageClick() {
    await this.args.onSendMessageClick(this.message, 'text');
    this.set('message', null);
  },
});
