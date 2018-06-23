import { belongsTo } from 'ember-data/relationships';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class Notification
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {Date}
   */
  createdOn: attr('timestamp'),

  /**
   * @type {Object}
   */
  dataMessage: attr(),

  /**
   * @type {Object}
   */
  displayMessage: attr(),

  /**
   * @type {string}
   */
  type: attr('string'),

  /**
   * @type {Model.User}
   */
  from: belongsTo('user', { inverse: null }),

  /**
   * @type {Model.User}
   */
  to: belongsTo('user', { inverse: 'notifications' }),

  /**
   * @return {Promise.<string>} Resolves to the visit link
   * @function
   */
  async getCommentVisitLink() {
    const { commentId } = this.dataMessage;
    const comment = await this.store.findRecord('comment', commentId);
    const page = await comment.get('page');
    const site = await page.get('site');

    return `http://${site.hostname}${page.decodedSlug}?cenchat_comment=${commentId}`;
  },
});
