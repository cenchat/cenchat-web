import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Component from '@ember/component';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class FollowUserButton
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
   * Handles follow user's click event
   */
  async followUser() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const currentUser = this.get('session.model');
    const userToFollow = this.get('--userToFollow');

    await fetch(
      `${config.apiHost}/api/users/${currentUser.get('id')}/followings`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userToFollow.get('id') }),
      },
    );

    toast(`Followed ${userToFollow.get('displayName')}`);

    if (this.get('--onFollowUser')) {
      this.get('--onFollowUser')();
    }
  },
});
