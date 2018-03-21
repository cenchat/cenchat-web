import { inject } from '@ember/service';
import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSiteIndex
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  router: inject(),

  /**
   * Handles verify site's click event
   */
  async handleVerifySiteClick() {
    this.set('model.isVerified', true);

    try {
      await this.get('model').save({ adapterOptions: { onServer: true } });
      toast('Site verified');
    } catch (e) {
      this.get('model').rollbackAttributes();
      toast(e.errors[0].detail);
    }
  },
});
