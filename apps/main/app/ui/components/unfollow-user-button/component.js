import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Component from '@ember/component';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class UnfollowUserButton
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
  tagName: '',

  /**
   * Handles unfollow button's click event
   */
  unfollowUser() {
    const userToUnfollow = this.get('--userToUnfollow');

    toast(`Unfollowed ${userToUnfollow.get('displayName')}`, 10000, {
      text: 'Undo',
      scheduledAction: async () => {
        const config = getOwner(this).resolveRegistration('config:environment');
        const token = await this.get('session.currentUser').getIdToken();
        const currentUser = this.get('session.model');

        await fetch(
          `${config.apiHost}/api/users/${currentUser.get('id')}/followings/${userToUnfollow.get('id')}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (this.get('--onUnfollowUser')) {
          this.get('--onUnfollowUser')();
        }
      },
    });
  },
});
