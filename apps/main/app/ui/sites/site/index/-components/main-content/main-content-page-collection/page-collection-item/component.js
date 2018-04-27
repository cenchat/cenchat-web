import Component from '@ember/component';

/**
 * @class SitesSiteIndexMainContentPageCollectionItem
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
  handlePageClick() {
    this.transitionToPage();
  },

  /**
   * @param {Event} event
   * @function
   */
  handlePageKeydown(event) {
    const code = event.which;

    if (code === 13 || code === 32) {
      event.preventDefault();
      this.transitionToPage();
    }
  },

  /**
   * @function
   */
  transitionToPage() {
    this.get('--router').transitionTo('sites.site.page', this.get('--page.id'));
  },
});
