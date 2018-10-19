import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSite
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @type {Ember.Service}
   */
  store: service(),

  /**
   * @function
   */
  async handleVerifySiteClick() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const response = await fetch(`${config.apiHost}/utils/verify-site`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ siteId: this.model.id }),
    });

    if (response.ok) {
      this.store.update('site', this.model.id, { isVerified: true });
      toast('Site is now verified');
    } else {
      const data = await response.text();

      toast(data);
    }
  },
});
