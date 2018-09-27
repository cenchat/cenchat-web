import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @class SitesSitePagesPageChatsRouteContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {number}
   */
  chatLimit: computed('args', {
    get() {
      return parseInt(this.args.chatLimit, 10) || null;
    },
  }),
});
