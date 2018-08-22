import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

/**
 * @class Firebase
 * @namespace ToriiAdapter
 * @extends EmberObject
 */
export default EmberObject.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @param {Object} option
   * @return {Promise}
   */
  async open(option) {
    const auth = this.firebase.auth();

    if (option.type === 'anonymous') {
      const { user } = await auth.signInAnonymously();

      return user;
    }

    const authResult = await auth.signInWithEmailLink(option.email, window.location.href);

    localStorage.removeItem('cenchatEmailForSignIn');

    if (authResult.additionalUserInfo.isNewUser) {
      await authResult.user.updateProfile({ displayName: option.displayName });
    }

    return authResult.user;
  },
});
