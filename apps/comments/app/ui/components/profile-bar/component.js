import { inject } from '@ember/service';
import Component from '@ember/component';

/**
 * @class ProfileBar
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @type {Ember.Service}
   */
  store: inject(),

  /**
   * Handles sign out click event
   *
   * @return {Promise} Resolves when session has signed out
   */
  handleSignOutClick() {
    return this.get('session').close();
  },

  /**
   * Handles notification dropdown click
   */
  async handleNotificationDropdownClick() {
    const userMetaInfo = await this.get('store').findRecord(
      'userMetaInfo',
      this.get('session.model.id'),
    );

    userMetaInfo.set('hasNewNotification', false);
    userMetaInfo.save();
  },
});
