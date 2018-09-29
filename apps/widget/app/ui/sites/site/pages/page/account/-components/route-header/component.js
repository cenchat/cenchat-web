import Component from '@ember/component';

/**
 * @class SitesSitePagesPageAccountRouteHeader
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @function
   */
  async handleSignOutClick() {
    await this.args.session.close();
    await this.args.router.transitionTo('sites.site.pages.page.my-chat');
  },
});
