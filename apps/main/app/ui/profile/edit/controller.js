import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class ProfileEdit
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @param {Object} profile
   * @param {Event} event
   * @function
   */
  async handleProfileFormSubmit(profile, event) {
    event.preventDefault();

    const model = this.get('model');

    try {
      model.set('displayName', profile.displayName);
      model.set('displayUsername', profile.username);
      model.set('shortBio', profile.shortBio);
      model.set('username', profile.username.toLowerCase());

      await model.save({
        adapterOptions: {
          include(batch, db) {
            const changedAttributes = model.changedAttributes();

            if (changedAttributes.username) {
              const [currentUsername, newUsername] = changedAttributes.username;

              batch.set(db.collection('usernames').doc(newUsername), {
                cloudFirestoreReference: db.collection('users').doc(model.get('id')),
              });

              if (currentUsername) {
                batch.delete(db.collection('usernames').doc(currentUsername));
              }
            }
          },
        },
      });
      this.transitionToRoute('profile.index');
      toast('Profile updated');
    } catch (error) {
      if (error.code === 'permission-denied') {
        toast('Username already exists');
      }

      model.rollbackAttributes();
    }
  },
});
