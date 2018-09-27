import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * @class SitesSitePagesPageExploreRouteContentChatCollectionItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  router: service('router'),

  /**
   * @override
   */
  tagName: '',

  /**
   * @param {string} id
   * @function
   */
  handleChatClick(id) {
    this.router.transitionTo('sites.site.pages.page.explore.chat', id);
  },
});
