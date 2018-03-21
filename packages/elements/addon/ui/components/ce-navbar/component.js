import Component from '@ember/component';

import layout from './template';

/**
 * @class CeNavbar
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
  tagName: 'nav',

  /**
   * @override
   */
  classNames: ['ce-navbar'],

  /**
   * @override
   */
  attributeBindings: ['data-test'],
});
