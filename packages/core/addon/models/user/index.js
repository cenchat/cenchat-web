import { Model } from 'ember-daux/daux';

/**
 * @class User
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class User extends Model {
  /**
   * @override
   */
  static get attributes() {
    return [
      'displayName',
      'displayUsername',
      'name',
      'photoUrl',
      'provider',
      'shortBio',
      'username',
    ];
  }

  /**
   * @override
   */
  static get relationship() {
    return {
      chats: {
        type: 'chat',
        kind: 'hasMany',
        inverse: 'creator',
      },
      metaInfo: {
        type: 'userMetaInfo',
        kind: 'belongsTo',
        inverse: null,
      },
      sitesAsAdmin: {
        type: 'site',
        kind: 'hasMany',
        inverse: 'admins',
      },
      stickerPacks: {
        type: 'stickerPack',
        kind: 'hasMany',
        inverse: null,
      },
    };
  }

  /**
   * @override
   */
  static deserialize(record) {
    if (typeof record === 'object' && record !== null && record.data) {
      if (record.exists) {
        const user = record.data();

        return { ...user, id: record.id, metaInfo: user.metaInfo.id };
      }

      return null;
    }

    return record;
  }
}
