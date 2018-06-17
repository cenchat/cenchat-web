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
   * @param {Element} target
   * @function
   */
  handleTextFieldInput(target) {
    debounce(this, 'processInput', target, 1000);
  },

  /**
   * @param {Element} target
   * @function
   */
  handleSelectFieldChange(target) {
    const { onChange } = this.args;

    if (onChange) {
      onChange(target);
    }
  },

  /**
   * @function
   * @private
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
   * @return {string} Field tag name
   * @function
   * @private
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
   * @param {Element} target
   * @function
   * @private
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

      const { onInput } = this.args;

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
   * @return {string|null} Feedback
   * @function
   * @private
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
