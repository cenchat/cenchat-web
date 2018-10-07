import Component from '@ember/component';

/**
 * @class SitesIndexSiteCollectionItem
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
  handleSiteClick() {
    this.transitionToSite();
  },

  /**
   * @param {Event} event
   * @function
   */
  handleSiteKeydown(event) {
    const code = event.which;

    if (code === 13 || code === 32) {
      event.preventDefault();
      this.transitionToSite();
    }
  },

  /**
   * @function
   * @private
   */
  transitionToSite() {
    this.args.router.transitionTo('sites.site', this.args.site.id);
  },
});
