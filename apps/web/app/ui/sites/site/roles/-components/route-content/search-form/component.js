import Component from '@ember/component';

/**
 * @class SitesSiteRolesRouteContentSearchForm
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
   */
  triggerSearchUserInput(target) {
    this.args.onSearchUserInput(target.value);
  },
});
