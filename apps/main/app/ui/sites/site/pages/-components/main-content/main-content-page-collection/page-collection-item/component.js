import Component from '@ember/component';

/**
 * @class SitesSitePagesMainContentPageCollectionItem
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
    this.openPage();
  },

  /**
   * @param {Event} event
   * @function
   */
  handlePageKeydown(event) {
    const code = event.which;

    if (code === 13 || code === 32) {
      event.preventDefault();
      this.openPage();
    }
  },

  /**
   * @function
   */
  openPage() {
    window.open(this.get('--page.url'), '_blank', 'noopener');
  },
});
