import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import Adapter from '@cenchat/firebase/torii-providers/firebase';

module('Unit | Torii Providers | firebase', function (hooks) {
  setupTest(hooks);

  module('function: open', function () {
    test('should return anonymous user when signing in anonymously', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = {
        displayName: null,
        email: null,
        photoURL: null,
        uid: 'user_a',
      };
      const signInAnonymouslyStub = sinon.stub().returns(Promise.resolve({ user }));
      const component = Adapter.create({
        firebase: {
          auth: sinon.stub().returns({ signInAnonymously: signInAnonymouslyStub }),
        },
      });

      // Act
      const result = await component.open({ type: 'anonymous' });

      // Assert
      assert.deepEqual(result, user);
    });

    test('should return user when signing in using email link', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        uid: 'user_a',
      };
      const signInWithEmailLinkStub = sinon.stub().returns(Promise.resolve({
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
        type: 'emailLink',
        displayName: 'User A',
        email: 'foobar@gmail.com',
      });

      // Assert
      assert.deepEqual(result, user);
    });

    test('should remove localStorage.cenchatEmailForSignIn when signing in using email link', async function (assert) {
      assert.expect(1);

      // Arrange
      const component = Adapter.create({
        firebase: {
          auth: sinon.stub().returns({
            signInWithEmailLink: sinon.stub().returns(Promise.resolve({
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

    test('should update display name when a new user when signing in with email link', async function (assert) {
      assert.expect(1);

      // Arrange
      const updateProfileStub = sinon.stub().returns(Promise.resolve());
      const user = {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        uid: 'user_a',

        updateProfile: updateProfileStub,
      };
      const signInWithEmailLinkStub = sinon.stub().returns(Promise.resolve({
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
