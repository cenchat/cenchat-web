import { inject } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

import layout from './template';

/**
 * @class UnfollowUserButton
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: inject(),

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
   * @param {Event} event
   * @function
   */
  unfollowUser(event) {
    event.stopPropagation();

    const { userToUnfollow } = this.args;

    toast(`Unfollowed ${userToUnfollow.get('displayName')}`, 10000, {
      text: 'Undo',

      scheduledAction: async () => {
        const db = this.firebase.firestore();
        const batch = db.batch();
        const currentUserId = this.session.get('model').id;
        const currentUserDocRef = db.collection('users').doc(currentUserId);
        const userToUnfollowDocRef = db.collection('users').doc(userToUnfollow.get('id'));

        batch.delete(currentUserDocRef.collection('followings').doc(userToUnfollow.get('id')));
        batch.delete(userToUnfollowDocRef.collection('followers').doc(currentUserId));

        await batch.commit();

        if (this.args.onUnfollowUser) {
          this.args.onUnfollowUser();
        }
      },
    });
  },
});
