import Component from '@ember/component';

import layout from './template';

/**
 * @class CeIcon
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
  tagName: 'i',

  /**
   * @override
   */
  classNames: ['ce-icon'],

  /**
   * @override
   */
  classNameBindings: ['mdi-ext:material-icons-ext:material-icons'],

  /**
   * @override
   */
  attributeBindings: ['data-test', 'title', 'aria-label', 'size'],

  /**
   * @override
   */
  ariaRole: 'none',
});
