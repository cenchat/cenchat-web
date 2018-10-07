import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

/**
 * @class Profile
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
  async handleSignOutClick() {
    await this.get('session').close();
    window.location.href = 'https://cenchat.com';
  },
});
