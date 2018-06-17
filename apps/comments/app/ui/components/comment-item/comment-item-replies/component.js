import Component from '@ember/component';

/**
 * @class CommentItemReplies
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {Array.<Model.Comment>}
   */
  prioritizedReplies: [],

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('threadLevel', this.args.threadLevel + 1);
  },

  /**
   * @param {Model.Comment} newReply
   * @function
   */
  handleSendCommentSuccess(newReply) {
    this.set('prioritizedReplies', [
      ...this.get('prioritizedReplies'),
      newReply,
    ]);
  },

  /**
   * @param {Array.<Model.Comment>} replies
   * @param {number} newLimit
   * @return {Promise} Resolves when the comments query has been updated
   * @function
   */
  handleLoadMoreCommentsClick(replies, newLimit) {
    replies.set('query.limit', newLimit);

    return replies.update();
  },
});
