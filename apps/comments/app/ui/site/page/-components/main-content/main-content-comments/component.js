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

    if (this.get('--comments.length') === 0 && this.get('--filterCommentsBy') === 'relevance') {
      this.get('--onFilterCommentsClick')('all');
    }
  },

  /**
   * @param {number} newLimit
   * @return {Promise} Resolves when the comments query has been updated
   * @function
   */
  async handleLoadMoreCommentsClick(newLimit) {
    const pageId = await this.get('--comments.firstObject.page.id');

    this.get('--comments').set('query.filter', (reference) => {
      const db = reference.firestore;

      return reference
        .where('page', '==', db.collection('pages').doc(pageId))
        .orderBy('createdOn')
        .limit(newLimit);
    });

    return this.get('--comments').update();
  },
});
