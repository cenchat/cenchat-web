import Component from '@ember/component';

/**
 * @class CommentComposerMessageTextbox
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  classNames: ['comment-composer-message-textbox'],

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    this.resizeField();
  },

  /**
   * Handles the field's input event
   *
   * @param {Object} event
   */
  handleFieldInput(event) {
    this.resizeField();
    this.get('--onTextBoxInput')(event.target.value);
  },

  /**
   * Resizes the field depending on the amount of text
   */
  resizeField() {
    const textarea = this.element.querySelector('textarea');

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 1}px`;
  },
});
