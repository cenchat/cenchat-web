import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { waitUntil } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import ObjectProxy from '@ember/object/proxy';

import {
  stubPromise,
  stubService,
} from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | application', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    stubService(this, 'session', {});
  });

  module('hook: beforeModel', () => {
    test('should set session in the beforeModel hook', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true));
      const route = this.owner.lookup('route:application');

      route.set('session', { fetch: stub });

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(stub.calledOnce);
    });
  });

  module('hook: afterModel', () => {
    hooks.beforeEach(function () {
      this.user = EmberObject.create({
        displayName: 'User A',
        facebookId: '12345',
        metaInfo: EmberObject.create({
          notificationTokens: [],

          save() {},
        }),
        photoUrl: 'user_a.jpg',

        save() {
          return stubPromise(true);
        },
      });
      this.firebase = EmberObject.create({
        messaging() {
          return {
            onTokenRefresh(callback) {
              return callback();
            },

            getToken() {
              return stubPromise(true, 'token_a');
            },

            requestPermission() {
              return stubPromise(true);
            },
          };
        },
      });
      this.session = ObjectProxy.create({
        content: EmberObject.create({
          isAuthenticated: true,
          uid: 'user_a',
          currentUser: {
            uid: 'user_a',
            email: 'user_a@gmail.com',
            photoURL: 'user_a.jpg',
            providerData: [{
              displayName: 'User A',
              photoURL: 'user_a.jpg',
              providerId: 'facebook.com',
              uid: '12345',
            }],

            updateProfile() {
              return stubPromise(true);
            },
          },
        }),

        close() {
          return stubPromise(true);
        },
      });
    });

    test('should set session model', async function (assert) {
      assert.expect(2);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true, this.user));
      const route = this.owner.lookup('route:application');

      route.set('firebase', this.firebase);
      route.set('session', this.session);
      route.set('store', { findRecord: stub });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(stub.calledWithExactly('user', 'user_a'));
      assert.equal(route.get('session.model'), this.user);
    });

    test('should sign out when fetching session model fails', async function (assert) {
      assert.expect(1);

      // Arrange
      const closeSpy = sinon.spy(this.session, 'close');
      const route = this.owner.lookup('route:application');

      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(false)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(closeSpy.calledOnce);
    });

    test('should update profile when Facebook UID is outdated with Facebook info', async function (assert) {
      assert.expect(6);

      // Arrange
      this.session.get('currentUser.providerData')[0].uid = '67890';

      const updateProfileSpy = sinon.spy(
        this.session.content.currentUser,
        'updateProfile',
      );
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('firebase', this.firebase);
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.equal(this.user.get('facebookId'), '67890');
      assert.equal(this.user.get('displayName'), 'User A');
      assert.equal(this.user.get('name'), 'user a');
      assert.equal(this.user.get('photoUrl'), 'user_a.jpg');
      assert.ok(saveSpy.calledOnce);
      assert.ok(updateProfileSpy.calledWithExactly({
        displayName: 'User A',
        photoURL: 'user_a.jpg',
      }));
    });

    test('should update profile when display name is outdated with Facebook info', async function (assert) {
      assert.expect(6);

      // Arrange
      this.session.get('currentUser.providerData')[0].displayName = 'New name';

      const updateProfileSpy = sinon.spy(
        this.session.content.currentUser,
        'updateProfile',
      );
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('firebase', this.firebase);
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.equal(this.user.get('facebookId'), '12345');
      assert.equal(this.user.get('displayName'), 'New name');
      assert.equal(this.user.get('name'), 'new name');
      assert.equal(this.user.get('photoUrl'), 'user_a.jpg');
      assert.ok(saveSpy.calledOnce);
      assert.ok(updateProfileSpy.calledWithExactly({
        displayName: 'New name',
        photoURL: 'user_a.jpg',
      }));
    });

    test('should update profile when photo url is outdated with Facebook info', async function (assert) {
      assert.expect(6);

      // Arrange
      this.session.get('currentUser.providerData')[0].photoURL = 'new.png';

      const updateProfileSpy = sinon.spy(
        this.session.content.currentUser,
        'updateProfile',
      );
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('firebase', this.firebase);
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.equal(this.user.get('facebookId'), '12345');
      assert.equal(this.user.get('displayName'), 'User A');
      assert.equal(this.user.get('name'), 'user a');
      assert.equal(this.user.get('photoUrl'), 'new.png');
      assert.ok(saveSpy.calledOnce);
      assert.ok(updateProfileSpy.calledWithExactly({
        displayName: 'User A',
        photoURL: 'new.png',
      }));
    });

    test('should not update profile when up-to-date with Facebook info', async function (assert) {
      assert.expect(2);

      // Arrange
      const updateProfileSpy = sinon.spy(
        this.session.content.currentUser,
        'updateProfile',
      );
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('firebase', this.firebase);
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(saveSpy.notCalled);
      assert.ok(updateProfileSpy.notCalled);
    });

    test('should not update profile when no Facebook provider', async function (assert) {
      assert.expect(2);

      // Arrange
      const updateProfileSpy = sinon.spy(
        this.session.content.currentUser,
        'updateProfile',
      );
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('firebase', this.firebase);
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(saveSpy.notCalled);
      assert.ok(updateProfileSpy.notCalled);
    });

    test('should update Facebook access token when current user has one', async function (assert) {
      assert.expect(3);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const userMetaInfo = EmberObject.create({
        facebookAccessToken: '12345',
        notificationTokens: [],
        save: saveStub,
      });

      this.user.set('metaInfo', userMetaInfo);

      const authData = {
        credential: { accessToken: '67890' },
      };
      const signInStub = sinon.stub().returns(stubPromise(true, authData));
      const route = this.owner.lookup('route:application');

      route.set('firebase', {
        auth: sinon.stub().returns({
          signInAndRetrieveDataWithCredential: signInStub,
        }),
        messaging: sinon.stub().returns({
          getToken: sinon.stub().returns(stubPromise(true, 'token_a')),
          requestPermission: sinon.stub().returns(stubPromise(true)),
        }),
      });
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(signInStub.calledOnce);
      assert.equal(userMetaInfo.get('facebookAccessToken'), '67890');
      assert.ok(saveStub.calledOnce);
    });

    test('should clear Facebook access token when it is invalid', async function (assert) {
      assert.expect(3);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const userMetaInfo = EmberObject.create({
        facebookAccessToken: '12345',
        notificationTokens: [],
        save: saveStub,
      });

      this.user.set('metaInfo', userMetaInfo);

      const signInStub = sinon.stub().returns(stubPromise(false));
      const route = this.owner.lookup('route:application');

      route.set('firebase', {
        auth: sinon.stub().returns({
          signInAndRetrieveDataWithCredential: signInStub,
        }),
        messaging: sinon.stub().returns({
          getToken: sinon.stub().returns(stubPromise(true, 'token_a')),
          requestPermission: sinon.stub().returns(stubPromise(true)),
        }),
      });
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(signInStub.calledOnce);
      assert.equal(userMetaInfo.get('facebookAccessToken'), null);
      assert.ok(saveStub.calledOnce);
    });

    test('should update notification tokens', async function (assert) {
      assert.expect(2);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const userMetaInfo = EmberObject.create({
        notificationTokens: [],
        save: saveStub,
      });

      this.user.set('metaInfo', userMetaInfo);

      const route = this.owner.lookup('route:application');

      route.set('firebase', this.firebase);
      route.set('session', this.session);
      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      await waitUntil(() => userMetaInfo.get('notificationTokens').length > 0);
      assert.deepEqual(userMetaInfo.get('notificationTokens'), ['token_a']);
      assert.ok(saveStub.calledTwice);
    });
  });
});
