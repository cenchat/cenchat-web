import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class UserMetaInfo
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {boolean}
   */
  hasNewNotification: attr('boolean'),
});
