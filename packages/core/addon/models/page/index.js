import { Model } from 'daux';

/**
 * @class Page
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class Page extends Model {
  /**
   * @override
   */
  static get attributes() {
    return [
      'createdOn',
      'description',
      'imageUrl',
      'slug',
      'title',
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
        inverse: 'page',
      },
      site: {
        type: 'site',
        kind: 'belongsTo',
        inverse: 'pages',
      },
    };
  }

  /**
   * @override
   */
  static deserialize(record) {
    if (typeof record === 'object' && record !== null && record.data) {
      if (record.exists) {
        const page = record.data();
        const createdOn = page.createdOn.toDate ? page.createdOn.toDate() : page.createdOn;

        return {
          ...page,
          createdOn,
          id: record.id,
          site: page.site.id,
        };
      }

      return null;
    }

    return record;
  }
}
