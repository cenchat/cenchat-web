import { hasMany } from 'ember-data/relationships';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class Site
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {string}
   */
  hostname: attr('string'),

  /**
   * @type {string}
   */
  imageUrl: attr('string'),

  /**
   * @type {boolean}
   */
  isVerified: attr('boolean'),

  /**
   * @type {string}
   */
  name: attr('string'),

  /**
   * @type {string}
   */
  theme: attr('string'),

  /**
   * @type {Array.<Model.User>}
   */
  admins: hasMany('user', {
    inverse: 'sitesAsAdmin',

    filter(reference) {
      return reference.limit(8);
    },
  }),

  /**
   * @type {Array.<Model.Page>}
   */
  pages: hasMany('page', {
    filter(reference) {
      return reference.limit(8);
    },
  }),
});
