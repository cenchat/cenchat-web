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
   * Returns the visit link for notification
   *
   * @return {Promise.<string>} Resolves to the visit link
   */
  async getCommentVisitLink() {
    const store = this.get('store');
    const commentId = this.get('dataMessage.commentId');
    const comment = await store.findRecord('comment', commentId);
    const page = await comment.get('page');
    const site = await page.get('site');

    return `http://${site.get('hostname')}${page.get('decodedSlug')}?cenchat_comment=${commentId}`;
  },
});
