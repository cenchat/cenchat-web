import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSitePages
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @param {Model.<Page>} page
   * @function
   */
  async handleRescrapePageClick(page) {
    try {
      await page.save({
        adapterOptions: { onServer: true },
      });
      toast('Page rescraped');
    } catch (error) {
      toast('Error rescraping page. Try again later.');
    }
  },
});
