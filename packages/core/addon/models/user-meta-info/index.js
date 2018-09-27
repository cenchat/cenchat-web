import { Model } from 'ember-daux/daux';

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
    return ['accessToken', 'hasNewNotification', 'notificationTokens'];
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
