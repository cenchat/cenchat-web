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
   * @param {Object} event
   * @function
   */
  handleFieldInput(event) {
    this.resizeField();
    this.args.onTextBoxInput(event.target.value);
  },

  /**
   * @function
   * @private
   */
  resizeField() {
    const textarea = this.element.querySelector('textarea');

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 1}px`;
  },
});
