// import { belongsTo } from 'ember-data/relationships';
// import Model from 'ember-data/model';
// import attr from 'ember-data/attr';

// /**
//  * @class Sticker
//  * @namespace Model
//  * @extends DS.Model
//  */
// export default Model.extend({
//   /**
//    * @type {string}
//    */
//   description: attr('string'),

//   /**
//    * @type {string}
//    */
//   imageUrl: attr('string'),

//   /**
//    * @type {string}
//    */
//   keyword1: attr('string'),

//   /**
//    * @type {string}
//    */
//   keyword2: attr('string'),

//   /**
//    * @type {string}
//    */
//   keyword3: attr('string'),

//   /**
//    * @type {string}
//    */
//   keyword4: attr('string'),

//   /**
//    * @type {string}
//    */
//   keyword5: attr('string'),

//   /**
//    * @type {Model.StickerPack}
//    */
//   pack: belongsTo('sticker-pack'),
// });

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
