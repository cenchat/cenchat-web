import Component from '@ember/component';

import layout from './template';

/**
 * @class CeSubheader
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
  classNames: ['ce-subheader'],

  /**
   * @override
   */
  attributeBindings: ['data-test'],
});
