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
   * @return {Promise} Resolves when session has signed out
   * @function
   */
  handleSignOutClick() {
    return this.get('session').close();
  },

  /**
   * @function
   */
  async handleNotificationDropdownClick() {
    const userMetaInfo = await this.store.findRecord(
      'userMetaInfo',
      this.get('session.model.id'),
    );

    userMetaInfo.set('hasNewNotification', false);
    userMetaInfo.save();
  },
});
