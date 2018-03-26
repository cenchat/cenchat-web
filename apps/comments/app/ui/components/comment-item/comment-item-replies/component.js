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

    this.set('threadLevel', this.get('--threadLevel') + 1);
  },

  /**
   * Handles the send comment success event
   *
   * @param {Model.Comment} newReply
   */
  handleSendCommentSuccess(newReply) {
    this.set('prioritizedReplies', [
      ...this.get('prioritizedReplies'),
      newReply,
    ]);
  },

  /**
   * Handles the load more comments click event
   *
   * @param {Array.<Model.Comment>} replies
   * @param {number} newLimit
   * @return {Promise} Resolves when the comments query has been updated
   */
  handleLoadMoreCommentsClick(replies, newLimit) {
    const commentId = this.get('--comment.id');

    if (this.get('--comment').belongsTo('root').id()) {
      replies.set(
        'query.filter',
        reference => reference
          .where('replyTo', '==', reference.doc(commentId))
          .orderBy('createdOn')
          .limit(newLimit),
      );
    } else {
      replies.set(
        'query.filter',
        reference => reference
          .where('root', '==', reference.doc(commentId))
          .orderBy('createdOn')
          .limit(newLimit),
      );
    }

    return replies.update();
  },
});
