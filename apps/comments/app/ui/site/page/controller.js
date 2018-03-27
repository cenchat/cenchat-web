import { computed } from '@ember/object';
import Controller from '@ember/controller';

/**
 * @class SitePage
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {string}
   */
  filterCommentsBy: computed('session.model', {
    get() {
      const isAuthenticated = this.get('session.model');

      return isAuthenticated ? 'relevance' : 'all';
    },

    set(key, value) {
      return value;
    },
  }),
});
