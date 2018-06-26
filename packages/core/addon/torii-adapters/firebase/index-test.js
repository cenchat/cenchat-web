import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import { stubPromise } from '@cenchat/core/test-support';
import Adapter from '@cenchat/core/torii-adapters/firebase';

module('Unit | Torii Adapters | firebase', function (hooks) {
  setupTest(hooks);

  module('function: open', function () {
    test('should return firebase user and existing user record', async function (assert) {
      assert.expect(1);

      // Arrange
      const currentUser = {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        uid: 'user_a',
      };
      const adapter = Adapter.create({
        firebase: null,
        store: {
          findRecord: sinon.stub().withArgs('user', 'user_a').returns(stubPromise(true, 'foo')),
        },
      });

      // Act
      const result = await adapter.open(currentUser);

      // Assert
      assert.deepEqual(result, {
        currentUser,
        model: 'foo',
      });
    });

    test('should return firebase user and newly created user record when it does not exist yet', async function (assert) {
      assert.expect(3);

      // Arrange
      const currentUser = {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        uid: 'user_a',
      };
      const saveStub = sinon.stub().returns(stubPromise(true));
      const createRecordStub = sinon.stub().returns({ save: saveStub });
      const adapter = Adapter.create({
        firebase: null,
        store: {
          createRecord: createRecordStub,
          findRecord: sinon.stub().withArgs('user', 'user_a').returns(stubPromise(false)),
        },
      });

      // Act
      const result = await adapter.open(currentUser);

      // Assert
      assert.ok(createRecordStub.calledWithExactly('user', {
        id: 'user_a',
        displayName: 'User A',
        displayUsername: null,
        name: 'user a',
        photoUrl: null,
        provider: null,
        shortBio: null,
        username: null,
      }));
      assert.ok(saveStub.calledOnce);
      assert.deepEqual(result, {
        currentUser,
        model: { save: saveStub },
      });
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
        getRedirectResult: sinon.stub().returns(stubPromise(true, {
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
        getRedirectResult: sinon.stub().returns(stubPromise(true, {})),

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
        getRedirectResult: sinon.stub().returns(stubPromise(false)),

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
        signOut: sinon.stub().returns(stubPromise(true, 'foo')),
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
