import { belongsTo } from 'ember-data/relationships';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class Sticker
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {string}
   */
  description: attr('string'),

  /**
   * @type {string}
   */
  imageUrl: attr('string'),

  /**
   * @type {string}
   */
  keyword1: attr('string'),

  /**
   * @type {string}
   */
  keyword2: attr('string'),

  /**
   * @type {string}
   */
  keyword3: attr('string'),

  /**
   * @type {string}
   */
  keyword4: attr('string'),

  /**
   * @type {string}
   */
  keyword5: attr('string'),

  /**
   * @type {Model.StickerPack}
   */
  pack: belongsTo('sticker-pack'),
});
