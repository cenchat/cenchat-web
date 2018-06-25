import Component from '@ember/component';

import layout from './template';

/**
 * @class EmailLinkAuthSignInMoreInfo
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  displayName: null,

  /**
   * @param {Element} target
   * @function
   */
  setDisplayName(target) {
    this.set('displayName', target.value);
  },
});
