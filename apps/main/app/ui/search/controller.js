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
   * Handles the search's input event
   *
   * @param {string} value
   */
  handleSearchInput(value) {
    this.set('query', value);
  },
});
