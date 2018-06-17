import { inject as service } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class ProfileSettingsSecuritySettingsDeleteAccount
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  router: service(),

  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('confirmationKey', Math.random().toString(32).slice(2).substr(0, 5));
  },

  /**
   * @function
   */
  showConfirmDeleteAccount() {
    this.set('isConfirmDeleteAccountVisible', true);
  },

  /**
   * @param {string} value
   * @function
   */
  setRepeatConfirmationKey({ value }) {
    this.set('repeatConfirmationKey', value);
  },

  /**
   * @function
   */
  deleteAccount() {
    this.get('router').transitionTo('profile');

    toast('Account deleted', 10000, {
      text: 'Undo',

      action: () => {},

      scheduledAction: () => {
        this.args.onDeleteAccountToastCompletion();
      },
    });
  },
});
