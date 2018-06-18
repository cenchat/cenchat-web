import Component from '@ember/component';

import layout from './template';

/**
 * @class NotificationListFollowItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    const { notification } = this.args;

    notification.get('to').then((toUser) => {
      const fromId = notification.get('from.id');

      toUser.isFollowing(fromId).then((result) => {
        this.set('isFollowingNotificationSender', result);
      });
    });
  },

  /**
   * @function
   */
  async handleFollowUser() {
    this.set('isFollowingNotificationSender', true);
  },
});
