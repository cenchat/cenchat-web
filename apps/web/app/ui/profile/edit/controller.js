import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class ProfileEdit
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @param {Object} profile
   * @param {Event} event
   * @function
   */
  async handleProfileFormSubmit(profile, event) {
    event.preventDefault();

    try {
      const db = this.firebase.firestore();
      const batch = db.batch();
      const updatedProfile = {
        displayName: profile.displayName,
        displayUsername: profile.username,
        name: profile.displayName.toLowerCase(),
        shortBio: profile.shortBio,
        username: profile.username.toLowerCase(),
      };

      batch.set(db.doc(`users/${this.model.id}`), updatedProfile);
      batch.set(db.doc(`usernames/${profile.username.toLowerCase()}`), {
        cloudFirestoreReference: db.doc(`users/${this.model.id}`),
      });

      if (this.model.username) {
        batch.delete(db.doc(`usernames/${this.model.username}`));
      }

      await batch.commit();
      this.store.set('user', { ...updatedProfile, id: this.model.id });
      this.transitionToRoute('profile.index');
      toast('Profile updated');
    } catch (error) {
      if (error.code === 'permission-denied') {
        toast('Username already exists');
      }
    }
  },
});
