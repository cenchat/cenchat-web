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
   * Handles site card's click event
   */
  handleSiteClick() {
    this.transitionToSite();
  },

  /**
   * Handles site card's keydown event
   *
   * @param {Event} event
   */
  handleSiteKeydown(event) {
    const code = event.which;

    if (code === 13 || code === 32) {
      event.preventDefault();
      this.transitionToSite();
    }
  },

  /**
   * Transitions to site route
   */
  transitionToSite() {
    this.get('--router').transitionTo('sites.site', this.get('--site.id'));
  },
});
