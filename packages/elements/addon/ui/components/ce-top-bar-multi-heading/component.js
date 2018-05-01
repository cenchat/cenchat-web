import Component from '@ember/component';

import layout from './template';

/**
 * @class CeTopBarMultiHeading
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
  classNames: ['ce-top-bar-multi-heading'],

  /**
   * @override
   */
  attributeBindings: ['data-test'],
});
