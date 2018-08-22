import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @class SitesSitePagesPageChatsRouteContentChatListItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
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
      let description = chat.lastMessage.author.displayName;

      if (this.args.session.get('model.id') === chat.lastMessage.author.id) {
        description = 'You';
      }

      if (chat.lastMessage.media) {
        if (chat.lastMessage.media.type === 'sticker') {
          description = `${description} sent a sticker`;
        } else if (chat.lastMessage.media.type === 'tenor_gif') {
          description = `${description} send a Tenor GIF`;
        }
      } else {
        description = `${description}: ${chat.lastMessage.text}`;
      }

      return description;
    },
  }),
});
