import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import fetch from 'fetch';

/**
 * @class ProfileSettings
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @function
   */
  async handleDeleteAccountToastCompletion() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();

    await fetch(`${config.apiHost}/users/${this.get('session.model.id')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await this.get('session').close();

    if (config.environment !== 'test') {
      window.location.replace('https://cenchat.com');
    }
  },
});
