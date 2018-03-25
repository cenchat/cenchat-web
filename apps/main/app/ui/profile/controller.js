import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class Profile
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * Handles username form's submit event
   *
   * @param {string} username
   * @param {Event} event
   */
  async handleUsernameSubmit(username, event) {
    event.preventDefault();

    this.set('model.displayUsername', username);
    this.set('model.username', username.toLocaleLowerCase());

    await this.get('model').save({ adapterOptions: { onServer: true } });
    toast('Username saved');
  },

  /**
   * Handles sign out click task
   */
  async handleSignOutClick() {
    await this.get('session').close();
    this.transitionToRoute('home');
  },
});
