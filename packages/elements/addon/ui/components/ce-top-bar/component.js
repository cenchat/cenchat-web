import Component from '@ember/component';

import layout from './template';

/**
 * @class CeTopBar
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
  tagName: 'header',

  /**
   * @override
   */
  classNames: ['ce-top-bar'],

  /**
   * @override
   */
  attributeBindings: [
    'data-test',
    'fixed',
    'multi-row',
    'responsive',
  ],
});
