import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/firebase/test-support';
import Adapter from '@cenchat/firebase/torii-adapters/firebase';

module('Unit | Torii Adapters | firebase', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: open', function () {
    test('should return firebase user and existing user record', async function (assert) {
      assert.expect(2);

      // Arrange
      const currentUser = {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        uid: 'user_a',
      };
      const adapter = Adapter.create({
        firebase: this.firebase,
        store: this.store,
      });

      // Act
      const result = await adapter.open(currentUser);

      // Assert
      assert.deepEqual(result.currentUser, currentUser);
      assert.equal(result.model.id, 'user_a');
    });

    test('should return firebase user and newly created user record when it does not exist yet', async function (assert) {
      assert.expect(3);

      // Arrange
      const currentUser = {
        displayName: 'User 100',
        email: 'user_100@gmail.com',
        photoURL: 'user_100.jpg',
        uid: 'user_100',
      };
      const adapter = Adapter.create({
        firebase: this.firebase,
        store: this.store,
      });

      // Act
      const result = await adapter.open(currentUser);

      // Assert
      assert.deepEqual(result.currentUser, currentUser);

      const userDocSnapshot = await this.db.doc('users/user_100').get();

      assert.ok(userDocSnapshot.exists);

      const userMetaSnapshot = await this.db.doc('userMetaInfos/user_100').get();

      assert.ok(userMetaSnapshot.exists);
    });
  });

  module('function: fetch', function () {
    test('should fetch signed in user from `onAuthStateChanged`', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns({
        onAuthStateChanged(callback) {
          callback({ uid: 'foo' });
        },
      });
      const adapter = Adapter.create({
        firebase: { auth: stub },
      });

      // Act
      const result = await adapter.fetch();

      // Assert
      assert.deepEqual(result, {
        currentUser: { uid: 'foo' },
      });
    });

    test('should fetch signed in user from `getRedirectResult`', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns({
        getRedirectResult: sinon.stub().returns(Promise.resolve({
          user: { uid: 'foo' },
        })),

        onAuthStateChanged(callback) {
          callback();
        },
      });
      const adapter = Adapter.create({
        firebase: { auth: stub },
      });

      // Act
      const result = await adapter.fetch();

      // Assert
      assert.deepEqual(result, {
        currentUser: { uid: 'foo' },
      });
    });

    test('should reject when no user info is available', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns({
        getRedirectResult: sinon.stub().returns(Promise.resolve({})),

        onAuthStateChanged(callback) {
          callback();
        },
      });
      const adapter = Adapter.create({
        firebase: { auth: stub },
      });

      try {
        // Act
        await adapter.fetch();
      } catch (e) {
        assert.ok(true);
      }
    });

    test('should reject when signing in errors out', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns({
        getRedirectResult: sinon.stub().returns(Promise.reject()),

        onAuthStateChanged(callback) {
          callback();
        },
      });
      const adapter = Adapter.create({
        firebase: { auth: stub },
      });

      try {
        // Act
        await adapter.fetch();
      } catch (e) {
        assert.ok(true);
      }
    });
  });

  module('function: close', function () {
    test('should sign out', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns({
        signOut: sinon.stub().returns(Promise.resolve('foo')),
      });
      const adapter = Adapter.create({
        firebase: { auth: stub },
      });

      // Act
      const result = await adapter.close();

      // Assert
      assert.equal(result, 'foo');
    });
  });
});
