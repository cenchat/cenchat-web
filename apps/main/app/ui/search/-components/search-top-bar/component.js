import Component from '@ember/component';

/**
 * @class SearchTopBar
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * Handles the search's input event
   *
   * @param {Element} target
   */
  handleSearchInput(target) {
    this.get('--onSearchInput')(target.value);
  },
});
