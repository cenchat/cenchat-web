import { hasMany } from 'ember-data/relationships';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class StickerPack
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {string}
   */
  artist: attr('string'),

  /**
   * @type {string}
   */
  description: attr('string'),

  /**
   * @type {string}
   */
  name: attr('string'),

  /**
   * @type {string}
   */
  thumbnailUrl: attr('string'),

  /**
   * @type {Array.<Model.Sticker>}
   */
  stickers: hasMany('sticker'),
});
