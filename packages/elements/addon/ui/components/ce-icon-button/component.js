import { run } from '@ember/runloop';
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
  didInsertElement(...args) {
    this._super(...args);

    // Use this rather than Ember name to consistently follow the order of events.
    // See: https://medium.com/square-corner-blog/deep-dive-on-ember-events-cf684fd3b808
    this.get('element').addEventListener('click', (event) => {
      run(() => {
        if (this.get('--onClick')) {
          this.get('triggerOnClick').perform(event);
        }
      });
    });
  },

  /**
   * @param {Event} event
   * @function
   * @private
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
