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
      const text = this.args.comment.get('text');
      let blockquoteClass = '';

      if (text) {
        if (text.length > 280) {
          blockquoteClass = 'comments-content__blockquote--small';
        } else if (text.length > 140) {
          blockquoteClass = 'comments-content__blockquote--medium';
        }
      }

      return blockquoteClass;
    },
  }),
});
