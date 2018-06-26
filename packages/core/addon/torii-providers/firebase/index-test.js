import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import { stubPromise } from '@cenchat/core/test-support';
import Adapter from '@cenchat/core/torii-providers/firebase';

module('Unit | Torii Providers | firebase', function (hooks) {
  setupTest(hooks);

  module('function: open', function () {
    test('should sign in', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        uid: 'user_a',
      };
      const signInWithEmailLinkStub = sinon.stub().returns(stubPromise(true, {
        user,
        additionalUserInfo: { isNewUser: false },
      }));
      const component = Adapter.create({
        firebase: {
          auth: sinon.stub().returns({ signInWithEmailLink: signInWithEmailLinkStub }),
        },
      });

      // Act
      const result = await component.open({
        displayName: 'User A',
        email: 'foobar@gmail.com',
      });

      // Assert
      assert.deepEqual(result, user);
    });

    test('should remove localStorage.cenchatEmailForSignIn', async function (assert) {
      assert.expect(1);

      // Arrange
      const component = Adapter.create({
        firebase: {
          auth: sinon.stub().returns({
            signInWithEmailLink: sinon.stub().returns(stubPromise(true, {
              user: {
                displayName: 'User A',
                email: 'user_a@gmail.com',
                photoURL: 'user_a.jpg',
                uid: 'user_a',
              },
              additionalUserInfo: { isNewUser: false },
            })),
          }),
        },
      });

      // Act
      await component.open({
        displayName: 'User A',
        email: 'foobar@gmail.com',
      });

      // Assert
      assert.equal(localStorage.getItem('cenchatEmailForSignIn'), undefined);
    });

    test('should update display name when a new user', async function (assert) {
      assert.expect(1);

      // Arrange
      const updateProfileStub = sinon.stub().returns(stubPromise(true));
      const user = {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        uid: 'user_a',

        updateProfile: updateProfileStub,
      };
      const signInWithEmailLinkStub = sinon.stub().returns(stubPromise(true, {
        user,
        additionalUserInfo: { isNewUser: true },
      }));
      const component = Adapter.create({
        firebase: {
          auth: sinon.stub().returns({ signInWithEmailLink: signInWithEmailLinkStub }),
        },
      });

      // Act
      await component.open({ displayName: 'User A', email: 'foobar@gmail.com' });

      // Assert
      assert.ok(updateProfileStub.calledWithExactly({ displayName: 'User A' }));
    });
  });
});
