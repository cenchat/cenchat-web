import { Model } from 'ember-daux/daux';

/**
 * @class Sticker
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class Sticker extends Model {
  /**
   * @override
   */
  static get attributes() {
    return ['description', 'imageUrl', 'keywords'];
  }

  /**
   * @override
   */
  static get relationship() {
    return {
      pack: {
        type: 'stickerPack',
        kind: 'belongsTo',
        inverse: 'stickers',
      },
    };
  }

  /**
   * @override
   */
  static deserialize(record) {
    if (typeof record === 'object' && record !== null && record.data) {
      if (record.exists) {
        const sticker = record.data();

        return { ...record.data(), id: record.id, pack: sticker.pack.id };
      }

      return null;
    }

    return record;
  }
}
