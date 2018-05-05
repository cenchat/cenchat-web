import Controller from '@ember/controller';

/**
 * @class Profile
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * Handles sign out click task
   */
  async handleSignOutClick() {
    await this.get('session').close();
    this.transitionToRoute('home');
  },
});
