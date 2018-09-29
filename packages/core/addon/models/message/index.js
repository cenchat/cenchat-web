import { Model } from 'ember-daux/daux';

/**
 * @class Message
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class Chat extends Model {
  /**
   * @override
   */
  static get attributes() {
    return ['createdOn', 'media', 'text'];
  }

  /**
   * @override
   */
  static get relationship() {
    return {
      author: {
        type: 'user',
        kind: 'belongsTo',
        inverse: null,
      },
      chat: {
        type: 'chat',
        kind: 'belongsTo',
        inverse: 'messages',
      },
    };
  }

  /**
   * @override
   */
  static deserialize(record) {
    if (typeof record === 'object' && record !== null && record.data) {
      if (record.exists) {
        const message = record.data();
        let createdOn;

        if (message.createdOn) {
          createdOn = message.createdOn.toDate ? message.createdOn.toDate() : message.createdOn;
        } else {
          createdOn = new Date();
        }

        return {
          ...message,
          createdOn,
          id: record.id,
          author: message.author.id,
          chat: message.chat.id,
        };
      }

      return null;
    }

    return record;
  }
}
