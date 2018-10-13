import { computed } from '@ember/object';
import Component from '@ember/component';

import layout from './template';

/**
 * @class ChatListItem
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
   * @type {number}
   */
  description: computed('args', {
    get() {
      const { chat } = this.args;
      let description = chat.lastMessage.author.displayName || 'Anonymous';

      if (this.args.session.get('model.id') === chat.lastMessage.author.id) {
        description = 'You';
      }

      if (chat.lastMessage.media) {
        if (chat.lastMessage.media.type === 'sticker') {
          description = `${description} sent a sticker`;
        } else if (chat.lastMessage.media.type === 'tenor_gif') {
          description = `${description} sent a Tenor GIF`;
        }
      } else {
        description = `${description}: ${chat.lastMessage.text}`;
      }

      return description;
    },
  }),

  /**
   * @type {boolean}
   */
  isUnread: computed('args', {
    get() {
      return this.args.session.get('model.metaInfo.unreadChats').includes(this.args.chat.id);
    },
  }),
});
