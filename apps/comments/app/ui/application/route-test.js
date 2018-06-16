import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import ObjectProxy from '@ember/object/proxy';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | application', (hooks) => {
  setupTest(hooks);

  module('hook: beforeModel', () => {
    test('should fetch session', async function (assert) {
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
        photoUrl: 'user_a.jpg',

        save() {
          return stubPromise(true);
        },
      });
      this.session = ObjectProxy.create({
        content: EmberObject.create({
          isAuthenticated: true,
          uid: 'user_a',
          currentUser: {
            uid: 'user_a',
            displayName: 'User A',
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
      const findRecordStub = sinon.stub().returns(stubPromise(true, this.user));
      const route = this.owner.lookup('route:application');

      route.set('session', this.session);
      route.set('store', { findRecord: findRecordStub });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(findRecordStub.calledWithExactly('user', 'user_a'));
      assert.equal(route.get('session.model'), this.user);
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
      this.session.get('currentUser.providerData')[0].photoURL = 'new.jpg';

      const updateProfileSpy = sinon.spy(
        this.session.content.currentUser,
        'updateProfile',
      );
      const saveSpy = sinon.spy(this.user, 'save');
      const route = this.owner.lookup('route:application');

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
      assert.equal(this.user.get('photoUrl'), 'new.jpg');
      assert.ok(saveSpy.calledOnce);
      assert.ok(updateProfileSpy.calledWithExactly({
        displayName: 'User A',
        photoURL: 'new.jpg',
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
  });
});
