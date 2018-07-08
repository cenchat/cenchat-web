import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSitePagesPage
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @param {string} slug
   * @function
   */
  async handleSavePageClick(slug) {
    try {
      this.set('model.slug', slug);

      await this.model.save({
        adapterOptions: { onServer: true },
      });
      toast('URL updated');
    } catch (error) {
      this.model.rollbackAttributes();

      const { detail, status } = error.errors[0];

      if (status === '404') {
        toast(detail);
      } else {
        toast('Error saving page. Try again later.');
      }
    }

    this.transitionToRoute('sites.site.pages');
  },
});
