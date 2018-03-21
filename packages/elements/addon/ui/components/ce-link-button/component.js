import Component from '@ember/component';

import layout from './template';

/**
 * @class CeLinkButton
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
  tagName: 'a',

  /**
   * @override
   */
  classNames: ['ce-link-button'],

  /**
   * @override
   */
  attributeBindings: [
    'data-test',
    'href',
    'aria-pressed',
    'target',
    'disabled',
    'onclick',
  ],
});
