import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Component from '@ember/component';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

import layout from './template';

/**
 * @class NotificationList
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * Handles follow back's click event
   *
   * @param {Model.Notification} notification
   */
  async handleFollowBackClick(notification) {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const userToFollow = await notification.get('from');
    const url = `${config.apiHost}/api/users/${notification.get('to.id')}/followings`;

    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userToFollow.get('id') }),
    });

    toast(`Followed ${userToFollow.get('displayName')}`);
  },
});
