import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class ProfileEdit
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * Handles profile form's submit event
   *
   * @param {Object} profile
   * @param {Event} event
   */
  async handleProfileFormSubmit(profile, event) {
    event.preventDefault();

    this.set('model.displayName', profile.displayName);
    this.set('model.displayUsername', profile.username);
    this.set('model.username', profile.username.toLowerCase());

    await this.get('model').save({ adapterOptions: { onServer: true } });
    this.transitionToRoute('profile.index');
    toast('Profile updated');
  },
});
