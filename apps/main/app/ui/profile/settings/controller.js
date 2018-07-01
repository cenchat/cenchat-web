import { getOwner } from '@ember/application';
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
  firebase: service(),

  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @type {Ember.Service}
   */
  router: service(),

  /**
   * @function
   */
  async handleDeleteAccountToastCompletion() {
    await this.model.destroyRecord({
      adapterOptions: { onServer: true },
    });
    await this.get('session').close();

    const config = getOwner(this).resolveRegistration('config:environment');

    if (config.environment !== 'test') {
      // Use native reload instead of transitioning to home to reset Store and Firestore state
      window.location.reload();
    }
  },
});
