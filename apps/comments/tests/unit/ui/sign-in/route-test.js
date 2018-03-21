import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | sign-in', function(hooks) {
  setupTest(hooks);

  module('hook: beforeModel', function() {
    test('should transition to application route when signed in', function(assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:sign-in');

      route.set('session', { model: 'foo' });
      route.set('transitionTo', transitionToStub);

      // Act
      route.beforeModel();

      // Assert
      assert.ok(transitionToStub.calledWithExactly('application'));
    });

    test('should not transition to application route when signed out', function(assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:sign-in');

      route.set('session', { model: null });
      route.set('transitionTo', transitionToStub);

      // Act
      route.beforeModel();

      // Assert
      assert.ok(transitionToStub.notCalled);
    });
  });
});
