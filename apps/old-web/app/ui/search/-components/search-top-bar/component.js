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
   * @param {Element} target
   * @function
   */
  handleSearchInput(target) {
    this.args.onSearchInput(target.value);
  },
});
