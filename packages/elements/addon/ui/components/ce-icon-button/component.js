import Component from '@ember/component';

import { task } from 'ember-concurrency';

import layout from './template';

/**
 * @class CeIconButton
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
  tagName: 'button',

  /**
   * @override
   */
  classNames: ['ce-icon-button'],

  /**
   * @override
   */
  attributeBindings: [
    'data-test',
    'type',
    'title',
    'aria-expanded',
    'aria-haspopup',
    'aria-label',
    'aria-pressed',
    'disabled',
    'badged',
    'square',
    'size',
    'mdi-ext',
    'triggerOnClick.isRunning:performing',
  ],

  /**
   * @override
   */
  click(event) {
    if (this.get('--onClick')) {
      this.get('triggerOnClick').perform(event);
    }
  },

  /**
   * Handles the click event
   *
   * @param {Event} event
   */
  triggerOnClick: task(function* (event) {
    this.set('disabled', true);

    try {
      yield this.get('--onClick')(event);
    } finally {
      this.set('disabled', false);
    }
  }).drop(),
});
