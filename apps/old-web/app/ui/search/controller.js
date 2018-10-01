import Controller from '@ember/controller';

/**
 * @class Search
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @override
   */
  queryParams: ['query'],

  /**
   * @param {string} value
   * @function
   */
  handleSearchInput(value) {
    this.set('query', value);
  },
});
