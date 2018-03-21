import Component from '@ember/component';

import layout from './template';

/**
 * @class CeIconLinkButton
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
  classNames: ['ce-icon-link-button'],

  /**
   * @override
   */
  attributeBindings: [
    'data-test',
    'title',
    'href',
    'aria-label',
    'aria-pressed',
    'target',
    'disabled',
    'badged',
    'square',
    'size',
    'mdi-ext',
    'onclick',
  ],
});
