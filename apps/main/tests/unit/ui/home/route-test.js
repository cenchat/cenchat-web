import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubService } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | home', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    stubService(this, 'session', {});
  });

  module('hook: beforeModel', function() {
    test('should transition to profile using username when signed in', async function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub();
      const route = this.owner.lookup('route:home');

      route.set('session', {
        model: EmberObject.create({ username: 'username' }),
      });
      route.set('transitionTo', stub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(stub.calledWithExactly('profile', 'username'));
    });

    test('should transition to profile using id when signed in and username is unavailable', async function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub();
      const route = this.owner.lookup('route:home');

      route.set('session', { model: EmberObject.create({ id: 'id' }) });
      route.set('transitionTo', stub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(stub.calledWithExactly('profile', 'id'));
    });

    test('should not transition to any route when signed out', async function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub();
      const route = this.owner.lookup('route:home');

      route.set('session', {});
      route.set('transitionTo', stub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(stub.notCalled);
    });
  });
});
