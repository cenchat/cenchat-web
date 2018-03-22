import Component from '@ember/component';

/**
 * @class CommentList
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {number}
   */
  limit: 2,

  /**
   * Load more comments
   */
  async loadMoreComments() {
    const comments = this.get('--comments');
    const newLimit = this.get('limit') + 4;

    if (comments.get('length') <= this.get('limit')) {
      await this.get('--onLoadMoreCommentsClick')(newLimit);
    }

    this.set('limit', newLimit);
  },
});
