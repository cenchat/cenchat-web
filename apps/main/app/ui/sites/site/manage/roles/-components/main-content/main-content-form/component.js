import Component from '@ember/component';

/**
 * @class SitesSiteIndexRolesMainContentForm
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
    this.get('--onSearchUserInput')(target.value);
  },
});
