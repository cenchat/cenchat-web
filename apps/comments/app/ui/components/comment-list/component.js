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
   * @function
   */
  async loadMoreComments() {
    const { comments } = this.args;
    const newLimit = this.limit + 4;

    if (comments.get('length') <= this.limit) {
      await this.args.onLoadMoreCommentsClick(newLimit);
    }

    this.set('limit', newLimit);
  },
});
