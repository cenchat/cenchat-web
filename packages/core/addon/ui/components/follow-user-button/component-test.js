import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/core/test-support';

module('Unit | Component | follow-user-button', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: followUser', () => {
    test('should follow user', async function (assert) {
      assert.expect(2);

      // Arrange
      const userToFollow = EmberObject.create({ id: 'user_c', displayName: 'User C' });
      const factory = this.owner.factoryFor('component:follow-user-button');
      const component = await factory.create({
        firebase: this.firebase,
        session: this.session,
        '--userToFollow': userToFollow,
      });

      // Act
      await component.followUser({ stopPropagation: sinon.stub() });

      // Assert
      const currentUserDocRef = this.db.collection('users').doc('user_a');
      const followedUserDocRef = this.db.collection('users').doc('user_c');
      const followingDocSnapshot = await currentUserDocRef
        .collection('followings')
        .doc('user_c')
        .get();

      assert.deepEqual(followingDocSnapshot.get('cloudFirestoreReference'), followedUserDocRef);

      const followerDocSnapshot = await followedUserDocRef
        .collection('followers')
        .doc('user_a')
        .get();

      assert.deepEqual(followerDocSnapshot.get('cloudFirestoreReference'), currentUserDocRef);
    });
  });
});
