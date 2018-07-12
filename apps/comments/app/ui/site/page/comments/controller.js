import Controller from '@ember/controller';

/**
 * @class SitePageComments
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @override
   */
  queryParams: ['filter'],

  /**
   * @param {number} newLimit
   * @return {Promise} Resolves when the comments query has been updated
   * @function
   */
  async handleLoadMoreCommentsClick(newLimit) {
    this.set('model.query.limit', newLimit);

    return this.model.update();
  },
});
