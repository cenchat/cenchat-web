import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @class SitesSitePagesPageRouteFooter
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
  isSiteAdmin: computed('args', {
    get() {
      if (this.args.session.get('isAuthenticated')) {
        const { site } = this.args.page;

        if (site.admins.find(admin => admin.id === this.args.session.get('model.id'))) {
          return true;
        }
      }

      return false;
    },
  }),
});
