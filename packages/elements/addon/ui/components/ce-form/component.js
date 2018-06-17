import Component from '@ember/component';

import { task } from 'ember-concurrency';

import layout from './template';

/**
 * @class CeForm
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
  tagName: 'form',

  /**
   * @override
   */
  attributeBindings: ['data-test', 'noValidate:novalidate'],

  /**
   * @type {boolean}
   * @readonly
   */
  noValidate: true,

  /**
   * @override
   */
  submit(event) {
    event.preventDefault();

    if (this.args.onSubmit) {
      this.get('triggerOnSubmit').perform(event);
    }
  },

  /**
   * @param {Event} event
   * @function
   * @private
   */
  triggerOnSubmit: task(function* (event) {
    const submitButton = this.get('element').querySelector('[type="submit"]');

    submitButton.disabled = true;
    submitButton.setAttribute('performing', '');

    try {
      yield this.args.onSubmit(event);
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('performing');
    }
  }).drop(),
});
