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
    test('should set session model in the afterModel hook', async function(assert) {
      assert.expect(2);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true, 'foo'));
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
            }, {
              photoURL: 'user_a.jpg',
              providerId: 'google.com',
            }],
          },
        }),
      }));

      route.set('store', { findRecord: stub });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(stub.calledWithExactly('user', 'user_a'));
      assert.equal(route.get('session.model'), 'foo');
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
            }, {
              photoURL: 'user_a.jpg',
              providerId: 'google.com',
            }],
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
  });
});
