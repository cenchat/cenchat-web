import Component from '@ember/component';

/**
 * @class SitePageMainContentComments
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.args.comments.get('length') === 0 && this.args.filterCommentsBy === 'relevance') {
      this.args.onFilterCommentsClick('all');
    }
  },

  /**
   * @param {number} newLimit
   * @return {Promise} Resolves when the comments query has been updated
   * @function
   */
  async handleLoadMoreCommentsClick(newLimit) {
    this.set('--comments.query.limit', newLimit);

    return this.args.comments.update();
  },
});
