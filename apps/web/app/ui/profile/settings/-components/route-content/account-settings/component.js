import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class ProfileSettingsRouteContentAccountSettings
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  newEmail: null,

  init(...args) {
    this._super(...args);

    this.set('newEmail', this.args.session.get('currentUser.email'));
  },

  /**
   * @function
   */
  async handleFormSubmit() {
    try {
      await this.args.session.get('currentUser').updateEmail(this.newEmail);
    } catch (error) {
      this.args.router.transitionTo('profile');

      if (error.code === 'auth/email-already-in-use') {
        toast('Email is already used');
      } else {
        toast('Unable to update account');
      }
    }
  },

  /**
   * @param {Object} target
   * @param {string} target.value
   * @function
   */
  handleEmailInput({ value }) {
    this.set('newEmail', value);
  },
});
