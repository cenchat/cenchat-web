import { Model } from 'daux';

/**
 * @class UserMetaInfo
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class UserMetaInfo extends Model {
  /**
   * @override
   */
  static get attributes() {
    return ['accessToken', 'notificationTokens', 'unreadChats'];
  }

  /**
   * @override
   */
  static deserialize(record) {
    if (typeof record === 'object' && record !== null && record.data) {
      if (record.exists) {
        return { ...record.data(), id: record.id };
      }

      return null;
    }

    return record;
  }
}
