import { debounce, scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

import layout from './template';

/**
 * @class CeField
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
  tagName: 'label',

  /**
   * @override
   */
  classNames: ['ce-field'],

  /**
   * @override
   */
  attributeBindings: ['data-test'],

  /**
   * @type {string}
   * @default
   */
  feedback: null,

  /**
   * @type {boolean}
   * @default
   */
  isMultiTextField: false,

  /**
   * @type {boolean}
   * @default
   */
  isSelectField: false,

  /**
   * @type {boolean}
   * @default
   */
  isInvalid: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.checkAndSetFieldType();
  },

  /**
   * Handles the text field's input event
   *
   * @param {Element} target
   */
  handleTextFieldInput(target) {
    debounce(this, () => {
      this.processInput(target);
    }, 1000);
  },

  /**
   * Handles the select field's change event
   *
   * @param {Element} target
   */
  handleSelectFieldChange(target) {
    const onChange = this.get('--onChange');

    if (onChange) {
      onChange(target);
    }
  },

  /**
   * Checks and set what the field type is
   */
  checkAndSetFieldType() {
    const type = this.get('type');

    if (type === 'multi-text') {
      this.set('isMultiTextField', true);
    } else if (type === 'select') {
      this.set('isSelectField', true);
    }
  },

  /**
   * Gets the tag name of the field
   *
   * @return {string} Field tag name
   */
  getFieldTagName() {
    if (this.get('isMultiTextField')) {
      return 'textarea';
    } else if (this.get('isSelectField')) {
      return 'select';
    }

    return 'input';
  },

  /**
   * Processes the input
   *
   * @param {Element} target
   */
  processInput(target) {
    // Set isInvalid to false to destroy the feedback element
    // before setting a new one so that screen readers will only
    // read out the latest feedback
    this.set('isInvalid', false);

    scheduleOnce('afterRender', () => {
      const feedback = this.getValidationFeedback();

      this.set('isInvalid', !!feedback);
      this.set('feedback', feedback);

      const onInput = this.get('--onInput');

      if (onInput) {
        if (feedback) {
          onInput({ name: target.name, value: null });
        } else {
          onInput(target);
        }
      }
    });
  },

  /**
   * Returns the validation feedback if any
   *
   * @return {string|null} Feedback
   */
  getValidationFeedback() {
    const fieldTagName = this.getFieldTagName();
    const fieldElement = this.element.querySelector(fieldTagName);
    let feedback = null;

    if (!fieldElement.checkValidity()) {
      if (fieldTagName === 'input') {
        feedback = fieldElement.validity.patternMismatch ?
          this.get('title') : fieldElement.validationMessage;
      } else {
        feedback = fieldElement.validationMessage;
      }
    }

    return feedback;
  },
});
