import { run } from '@ember/runloop';
import Component from '@ember/component';

import { task } from 'ember-concurrency';

import layout from './template';

/**
 * @class CeButton
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
  classNames: ['ce-button'],

  /**
   * @override
   */
  attributeBindings: [
    'data-test',
    'type',
    'aria-expanded',
    'aria-haspopup',
    'aria-pressed',
    'disabled',
    'outlined',
    'size',
    'triggerOnClick.isRunning:performing',
  ],

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    // Use this rather than Ember name to consistently follow the order of events.
    // See: https://medium.com/square-corner-blog/deep-dive-on-ember-events-cf684fd3b808
    this.element.addEventListener('click', (event) => {
      run(() => {
        if (this.args.onClick) {
          this.triggerOnClick.perform(event);
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
      yield this.args.onClick(event);
    } finally {
      this.set('disabled', false);
    }
  }).drop(),
});
