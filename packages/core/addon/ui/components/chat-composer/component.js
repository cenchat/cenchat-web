import { computed } from '@ember/object';
import Component from '@ember/component';

import layout from './template';

/**
 * @class ChatComposer
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
  isReadOnly: computed('args', {
    get() {
      if (this.args.isReadOnlyDisabled) {
        return false;
      }

      if (!this.args.chat.id) {
        return false;
      }

      const currentUserId = this.args.session.get('model.id');

      return (
        this.args.chat.creator.id !== currentUserId
        && !this.args.chat.site.admins.find(admin => admin.id === currentUserId)
      );
    },
  }),

  /**
   * @type {boolean}
   */
  isSubToolbarVisible: false,

  /**
   * @param {string} content
   * @param {string} type
   * @function
   */
  async handleSendMessageClick(content, type) {
    await this.args.onSendMessageClick(content, type);
    this.set('isSubToolbarVisible', false);
  },

  /**
   * @function
   */
  handleShowSubToolbarClick() {
    this.set('isSubToolbarVisible', true);
  },

  /**
   * @function
   */
  handleHideSubToolbarClick() {
    this.set('isSubToolbarVisible', false);
  },
});
