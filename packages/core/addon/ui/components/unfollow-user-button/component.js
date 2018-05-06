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
   * @function
   */
  unfollowUser(event) {
    event.stopPropagation();

    const {
      id: userToUnfollowId,
      displayName: userToUnfollowDisplayName,
    } = this.get('--userToUnfollow').getProperties('id', 'displayName');

    toast(`Unfollowed ${userToUnfollowDisplayName}`, 10000, {
      text: 'Undo',
      scheduledAction: async () => {
        const db = this.get('firebase').firestore();
        const batch = db.batch();
        const currentUserId = this.get('session.model.id');
        const currentUserDocRef = db.collection('users').doc(currentUserId);
        const userToUnfollowDocRef = db.collection('users').doc(userToUnfollowId);

        batch.delete(currentUserDocRef.collection('followings').doc(userToUnfollowId));
        batch.delete(userToUnfollowDocRef.collection('followers').doc(currentUserId));

        await batch.commit();

        if (this.get('--onUnfollowUser')) {
          this.get('--onUnfollowUser')();
        }
      },
    });
  },
});
