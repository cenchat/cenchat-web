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

    const db = this.firebase.firestore();
    const batch = db.batch();
    const currentUserId = this.session.get('model').id;
    const currentUserDocRef = db.collection('users').doc(currentUserId);
    const { id, displayName, name } = this.args.userToFollow;
    const userToFollowDocRef = db.collection('users').doc(id);

    batch.set(currentUserDocRef.collection('followings').doc(id), {
      name,
      cloudFirestoreReference: userToFollowDocRef,
    });
    batch.set(userToFollowDocRef.collection('followers').doc(currentUserId), {
      cloudFirestoreReference: currentUserDocRef,
      name: this.session.get('model').name,
    });

    await batch.commit();

    toast(`Followed ${displayName}`);

    if (this.args.onFollowUser) {
      this.args.onFollowUser();
    }
  },
});
