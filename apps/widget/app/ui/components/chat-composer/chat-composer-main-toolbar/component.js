import Component from '@ember/component';

/**
 * @class ChatComposerMainToolbar
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
  isSubToolbarVisible: false,

  /**
   * @function
   */
  async handleSendMessageClick() {
    await this.args.onSendMessageClick(this.message, 'text');
    this.set('message', null);
  },
});
