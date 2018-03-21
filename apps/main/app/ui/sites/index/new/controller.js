import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesIndexNew
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * Handles site form's submit event
   *
   * @param {Object} site
   * @param {Event} event
   */
  async handleSiteFormSubmit(site, event) {
    event.preventDefault();

    await this.get('store').createRecord('site', {
      ...site,
      admins: [this.get('session.model')],
    }).save({ adapterOptions: { onServer: true } });
    this.transitionToRoute('sites.index');
    toast('Site added');
  },
});
