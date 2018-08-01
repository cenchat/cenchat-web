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
        photoUrl: null,
      });
      this.session = ObjectProxy.create({
        content: EmberObject.create({
          isAuthenticated: true,
          currentUser: { uid: 'user_a' },
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
  });
});
