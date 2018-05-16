import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Controller from '@ember/controller';

import fetch from 'fetch';

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
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @function
   */
  async handleVerifySiteClick() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const response = await fetch(`${config.apiHost}/api/utils/verify-site`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ siteId: this.get('model.id') }),
    });

    if (response.ok) {
      toast('Site is now verified');
    } else {
      const data = await response.text();

      toast(data);
    }
  },
});
