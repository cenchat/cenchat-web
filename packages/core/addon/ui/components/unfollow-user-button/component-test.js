import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/core/test-support';

module('Unit | Component | ununfollow-user-button', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: ununfollowUser', () => {
    test('should ununfollow user', async function (assert) {
      assert.expect(2);

      // Arrange
      const userToUnfollow = EmberObject.create({ id: 'user_b', displayName: 'User B' });
      const factory = this.owner.factoryFor('component:unfollow-user-button');
      const component = await factory.create({
        firebase: this.firebase,
        session: this.session,
        '--userToUnfollow': userToUnfollow,
      });

      // Act
      await component.unfollowUser({ stopPropagation: sinon.stub() });

      // Assert
      const currentUserDocRef = this.db.collection('users').doc('user_a');
      const unfollowedUserDocRef = this.db.collection('users').doc('user_b');
      const followingDocSnapshot = await currentUserDocRef
        .collection('followings')
        .doc('user_b')
        .get();

      assert.deepEqual(followingDocSnapshot.get('cloudFirestoreReference'), unfollowedUserDocRef);

      const followerDocSnapshot = await unfollowedUserDocRef
        .collection('followers')
        .doc('user_a')
        .get();

      assert.deepEqual(followerDocSnapshot.get('cloudFirestoreReference'), currentUserDocRef);
    });
  });
});
