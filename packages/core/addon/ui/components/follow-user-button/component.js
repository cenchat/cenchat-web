import { inject } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

import layout from './template';

/**
 * @class FollowUserButton
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
  async followUser(event) {
    event.stopPropagation();

    const db = this.get('firebase').firestore();
    const batch = db.batch();
    const currentUserId = this.get('session.model.id');
    const currentUserDocRef = db.collection('users').doc(currentUserId);
    const {
      id: userToFollowId,
      displayName: userToFollowDisplayName,
    } = this.get('--userToFollow').getProperties('id', 'displayName');
    const userToFollowDocRef = db.collection('users').doc(userToFollowId);

    batch.set(currentUserDocRef.collection('followings').doc(userToFollowId), {
      cloudFirestoreReference: userToFollowDocRef,
    });
    batch.set(userToFollowDocRef.collection('followers').doc(currentUserId), {
      cloudFirestoreReference: currentUserDocRef,
    });

    await batch.commit();

    toast(`Followed ${userToFollowDisplayName}`);

    if (this.get('--onFollowUser')) {
      this.get('--onFollowUser')();
    }
  },
});
