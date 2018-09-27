import { Model } from 'ember-daux/daux';

/**
 * @class StickerPack
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class StickerPack extends Model {
  /**
   * @override
   */
  static get attributes() {
    return [
      'artist',
      'description',
      'name',
      'thumbnailUrl',
    ];
  }

  /**
   * @override
   */
  static get relationship() {
    return {
      stickers: {
        type: 'sticker',
        kind: 'hasMany',
        inverse: 'pack',
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
