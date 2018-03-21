import Component from '@ember/component';

import layout from './template';

/**
 * @class CeSpinner
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
  classNames: ['ce-spinner'],

  /**
   * @override
   */
  attributeBindings: ['data-test', 'aria-valuetext'],

  /**
   * @override
   */
  ariaRole: 'progressbar',
});
