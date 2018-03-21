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

    if (this.get('--onSubmit')) {
      this.get('triggerOnSubmit').perform(event);
    }
  },

  /**
   * Handles the submit event
   *
   * @param {Event} event
   */
  triggerOnSubmit: task(function* (event) {
    const submitButton = this.getSubmitButton();

    submitButton.disabled = true;
    submitButton.setAttribute('performing', '');

    try {
      yield this.get('--onSubmit')(event);
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('performing');
    }
  }).drop(),

  /**
   * Returns the submit button element of the component
   *
   * @return {Element} Submit button element
   */
  getSubmitButton() {
    return this.get('element').querySelector('[type="submit"]');
  },
});
