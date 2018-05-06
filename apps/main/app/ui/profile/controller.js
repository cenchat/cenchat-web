import Controller from '@ember/controller';

/**
 * @class Profile
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @function
   */
  async handleSignOutClick() {
    await this.get('session').close();
    this.transitionToRoute('home');
  },
});
