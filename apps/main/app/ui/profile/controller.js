import { getOwner } from '@ember/application';
import Controller from '@ember/controller';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class Profile
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * Handles username form's submit event
   *
   * @param {string} username
   * @param {Event} event
   */
  async handleUsernameSubmit(username, event) {
    event.preventDefault();

    this.set('model.displayUsername', username);
    this.set('model.username', username.toLocaleLowerCase());

    await this.get('model').save({ adapterOptions: { onServer: true } });
    toast('Username saved');
  },

  /**
   * Handles follow user's click event
   */
  async handleFollowUserClick() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const currentUser = this.get('session.model');
    const userToFollow = this.get('model');

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
  },

  /**
   * Handles sign out click task
   */
  async handleSignOutClick() {
    await this.get('session').close();
    this.transitionToRoute('home');
  },

  /**
   * Unfollows a user
   *
   * @param {Model.User} user
   */
  async unfollowUser(user) {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const currentUser = this.get('session.model');

    await fetch(
      `${config.apiHost}/api/users/${currentUser.get('id')}/followings/${user.get('id')}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  },

  /**
   * Handles unfollow button's click event
   *
   * @param {Model.User} user
   */
  handleUnfollowUserClick(user) {
    toast(`Unfollowed ${user.get('displayName')}`, 10000, {
      text: 'Undo',
      scheduledAction: () => {
        this.unfollowUser(user);
      },
    });
  },
});
