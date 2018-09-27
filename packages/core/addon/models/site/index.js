import { Model } from 'ember-daux/daux';

/**
 * @class Site
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class Site extends Model {
  /**
   * @override
   */
  static get attributes() {
    return [
      'brandColor',
      'displayName',
      'hostname',
      'imageUrl',
      'isVerified',
      'name',
      'theme',
    ];
  }

  /**
   * @override
   */
  static get relationship() {
    return {
      admins: {
        type: 'user',
        kind: 'hasMany',
        inverse: 'sitesAsAdmin',
      },
      chats: {
        type: 'chat',
        kind: 'hasMany',
        inverse: 'site',
      },
      pages: {
        type: 'page',
        kind: 'hasMany',
        inverse: 'site',
      },
    };
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
