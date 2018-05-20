import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

/**
 * @class ProfileSettings
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @function
   */
  async handleDeleteAccountToastCompletion() {
    await this.get('model').destroyRecord({
      adapterOptions: { onServer: true },
    });
    await this.get('session').close();
    this.transitionToRoute('home');
  },
});
