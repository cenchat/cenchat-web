import Component from '@ember/component';

/**
 * @class SitesSiteIndexPageCollectionItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * Handles page card's click event
   */
  handlePageClick() {
    this.transitionToPage();
  },

  /**
   * Handles page card's keydown event
   *
   * @param {Event} event
   */
  handlePageKeydown(event) {
    const code = event.which;

    if (code === 13 || code === 32) {
      event.preventDefault();
      this.transitionToPage();
    }
  },

  /**
   * Transitions to page route
   */
  transitionToPage() {
    this.get('--router').transitionTo('sites.site.page', this.get('--page.id'));
  },
});
