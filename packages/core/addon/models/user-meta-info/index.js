import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class UserMetaInfo
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {Object}
   */
  accessToken: attr(),

  /**
   * @type {boolean}
   */
  hasNewNotification: attr('boolean'),

  /**
   * @type {Array.<string>}
   */
  notificationTokens: attr(),
});
