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

    const model = this.get('model');

    model.set('displayUsername', username);
    model.set('username', username.toLowerCase());

    await model.save({
      adapterOptions: {
        include(batch, db) {
          batch.set(db.collection('usernames').doc(username.toLowerCase()), {
            cloudFirestoreReference: db.collection('users').doc(model.get('id')),
          });
        },
      },
    });
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
