import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubService } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sign in', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    stubService(this, 'session', {});
  });

  module('hook: beforeModel', function() {
    test('should transition to home route when signed in', function(assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:sign-in');

      route.set('session', { model: 'foo' });
      route.set('transitionTo', transitionToStub);

      // Act
      route.beforeModel();

      // Assert
      assert.ok(transitionToStub.calledWithExactly('home'));
    });
  });
});
