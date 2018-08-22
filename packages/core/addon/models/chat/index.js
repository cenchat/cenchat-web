import { Model } from 'ember-daux/daux';

/**
 * @class Chat
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class Chat extends Model {
  /**
   * @override
   */
  static get attributes() {
    return ['isPublicized', 'lastActivityTimestamp', 'publicizedTitle'];
  }

  /**
   * @override
   */
  static get relationship() {
    return {
      creator: {
        type: 'user',
        kind: 'belongsTo',
        inverse: 'chats',
      },
      lastMessage: {
        type: 'message',
        kind: 'belongsTo',
        inverse: null,
      },
      messages: {
        type: 'message',
        kind: 'hasMany',
        inverse: 'chat',
      },
      page: {
        type: 'page',
        kind: 'belongsTo',
        inverse: 'chats',
      },
      site: {
        type: 'site',
        kind: 'belongsTo',
        inverse: 'chats',
      },
    };
  }

  /**
   * @override
   */
  static deserialize(record) {
    if (typeof record === 'object' && record !== null && record.data) {
      if (record.exists) {
        const chat = record.data();
        const { lastActivityTimestamp } = chat;
        const parsedLastActivityTimestamp = lastActivityTimestamp && lastActivityTimestamp.toDate
          ? lastActivityTimestamp.toDate()
          : lastActivityTimestamp;

        return {
          ...chat,
          id: record.id,
          creator: chat.creator.id,
          lastActivityTimestamp: parsedLastActivityTimestamp,
          lastMessage: chat.lastMessage.id,
          page: chat.page.id,
          site: chat.site.id,
        };
      }

      return null;
    }

    return record;
  }
}
