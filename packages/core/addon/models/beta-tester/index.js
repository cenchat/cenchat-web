import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class BetaTester
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {string}
   */
  monthlyViews: attr('string'),

  /**
   * @type {string}
   */
  status: attr('string'),

  /**
   * @type {string}
   */
  website: attr('string'),
});
