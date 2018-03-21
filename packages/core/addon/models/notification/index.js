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
   * Returns the visit link for a comment_tag type notification
   *
   * @return {Promise.<string>} Resolves to the visit link
   */
  getCommentTagVisitLink() {
    const store = this.get('store');
    const commentId = this.get('dataMessage.commentId');

    return store.findRecord('comment', commentId).then((comment) => {
      return comment.get('page');
    }).then((page) => {
      return page.get('site').then((site) => {
        return `http://${site.get('hostname')}${page.get('decodedSlug')}`;
      });
    });
  },
});
