import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @class CommentItemToolbar
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isReplyButtonVisible: computed('--session.model', {
    get() {
      const { threadLevel } = this.args;

      if (threadLevel >= 3) {
        return false;
      } else if (threadLevel === 2 && !this.args.session.get('model')) {
        return false;
      }

      return true;
    },
  }),
});
