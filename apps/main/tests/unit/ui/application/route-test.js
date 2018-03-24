import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import ObjectProxy from '@ember/object/proxy';

import {
  stubPromise,
  stubService,
} from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    stubService(this, 'session', {});
  });

  module('hook: beforeModel', function() {
    test('should set session in the beforeModel hook', async function(assert) {
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

  module('hook: afterModel', function() {
    hooks.beforeEach(function() {
      this.user = EmberObject.create({
        displayName: 'User A',
        photoUrl: 'user_a.jpg',

        save() {
          return stubPromise(true);
        },
      });
    });

    test('should set session model', async function(assert) {
      assert.expect(2);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true, this.user));
      const route = this.owner.lookup('route:application');

      route.set('session', ObjectProxy.create({
        content: EmberObject.create({
          isAuthenticated: true,
          uid: 'user_a',
          currentUser: {
            uid: 'user_a',
            email: 'user_a@gmail.com',
            photoURL: 'user_a.jpg',
            providerData: [{
              photoURL: 'user_a.jpg',
              providerId: 'facebook.com',
            }],
            updateProfile: sinon.stub().returns(stubPromise(true)),
          },
        }),
      }));

      route.set('store', { findRecord: stub });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(stub.calledWithExactly('user', 'user_a'));
      assert.equal(route.get('session.model'), this.user);
    });

    test('should sign out when fetching session model fails', async function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true));
      const route = this.owner.lookup('route:application');

      route.set('session', ObjectProxy.create({
        content: EmberObject.create({
          isAuthenticated: true,
          uid: 'user_a',
          currentUser: {
            uid: 'user_a',
            email: 'user_a@gmail.com',
            photoURL: 'user_a.jpg',
            providerData: [{
              photoURL: 'user_a.jpg',
              providerId: 'facebook.com',
            }],
            updateProfile: sinon.stub().returns(stubPromise(true)),
          },
        }),
        close: stub,
      }));

      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(false)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(stub.calledOnce);
    });

    test('should update profile when display name is outdated with Facebook info', async function(assert) {
      assert.expect(4);

      // Arrange
      const updateProfileStub = sinon.stub().returns(stubPromise(true));
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('session', ObjectProxy.create({
        content: EmberObject.create({
          isAuthenticated: true,
          uid: 'user_a',
          currentUser: {
            uid: 'user_a',
            email: 'user_a@gmail.com',
            photoURL: 'user_a.jpg',
            providerData: [{
              displayName: 'New name',
              photoURL: 'user_a.jpg',
              providerId: 'facebook.com',
            }],
            updateProfile: updateProfileStub,
          },
        }),
      }));

      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.equal(this.user.get('displayName'), 'New name');
      assert.equal(this.user.get('photoUrl'), 'user_a.jpg');
      assert.ok(saveSpy.calledOnce);
      assert.ok(updateProfileStub.calledWithExactly({
        displayName: 'New name',
        photoURL: 'user_a.jpg',
      }));
    });

    test('should update profile when photo url is outdated with Facebook info', async function(assert) {
      assert.expect(4);

      // Arrange
      const updateProfileStub = sinon.stub().returns(stubPromise(true));
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('session', ObjectProxy.create({
        content: EmberObject.create({
          isAuthenticated: true,
          uid: 'user_a',
          currentUser: {
            uid: 'user_a',
            email: 'user_a@gmail.com',
            photoURL: 'user_a.jpg',
            providerData: [{
              displayName: 'User A',
              photoURL: 'new_photo.jpg',
              providerId: 'facebook.com',
            }],
            updateProfile: updateProfileStub,
          },
        }),
      }));

      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.equal(this.user.get('displayName'), 'User A');
      assert.equal(this.user.get('photoUrl'), 'new_photo.jpg');
      assert.ok(saveSpy.calledOnce);
      assert.ok(updateProfileStub.calledWithExactly({
        displayName: 'User A',
        photoURL: 'new_photo.jpg',
      }));
    });

    test('should not update profile when up-to-date with Facebook info', async function(assert) {
      assert.expect(2);

      // Arrange
      const updateProfileStub = sinon.stub().returns(stubPromise(true));
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('session', ObjectProxy.create({
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
            }],
            updateProfile: updateProfileStub,
          },
        }),
      }));

      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(saveSpy.notCalled);
      assert.ok(updateProfileStub.notCalled);
    });

    test('should not update profile when no Facebook provider', async function(assert) {
      assert.expect(2);

      // Arrange
      const updateProfileStub = sinon.stub().returns(stubPromise(true));
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

      route.set('session', ObjectProxy.create({
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
              providerId: 'password',
            }],
            updateProfile: updateProfileStub,
          },
        }),
      }));

      route.set('store', {
        findRecord: sinon.stub().returns(stubPromise(true, this.user)),
      });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(saveSpy.notCalled);
      assert.ok(updateProfileStub.notCalled);
    });
  });
});
