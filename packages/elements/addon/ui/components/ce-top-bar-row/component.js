import Component from '@ember/component';

import layout from './template';

/**
 * @class CeTopBarRow
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
  classNames: ['ce-top-bar-row'],

  /**
   * @override
   */
  attributeBindings: ['data-test'],
});
