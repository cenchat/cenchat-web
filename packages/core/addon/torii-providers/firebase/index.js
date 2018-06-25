import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

/**
 * @class Application
 * @namespace ToriiAdapter
 * @extends EmberObject
 */
export default EmberObject.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service(),

  /**
   * @param {Object} option
   * @return {Promise}
   */
  async open(option) {
    const authResult = await this.firebase.auth().signInWithEmailLink(
      option.email,
      window.location.href,
    );

    localStorage.removeItem('cenchatEmailForSignIn');

    if (authResult.additionalUserInfo.isNewUser) {
      await authResult.user.updateProfile({ displayName: option.displayName });
    }

    return authResult.user;
  },
});
