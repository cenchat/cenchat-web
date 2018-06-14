import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @class CommentsContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  blockQuoteClass: computed('--comment.text', {
    get() {
      const commentText = this.get('--comment.text');
      let blockquoteClass = '';

      if (commentText) {
        if (commentText.length > 280) {
          blockquoteClass = 'comments-content__blockquote--small';
        } else if (commentText.length > 140) {
          blockquoteClass = 'comments-content__blockquote--medium';
        }
      }

      return blockquoteClass;
    },
  }),
});
