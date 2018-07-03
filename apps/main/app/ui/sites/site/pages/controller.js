import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSitePages
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @param {string} pageId
   * @function
   */
  async handleRescrapePageClick(pageId) {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const response = await fetch(`${config.apiHost}/api/utils/rescrape-page/${pageId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      toast('Page rescraped');
    } else {
      const data = await response.text();

      toast(data);
    }
  },
});
