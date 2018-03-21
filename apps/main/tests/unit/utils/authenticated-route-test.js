import { module, test } from 'qunit';

import sinon from 'sinon';

import AuthenticatedRoute from 'main/utils/authenticated-route';

module('Unit | Utility | authenticated route', function(hooks) {
  module('hook: beforeModel', function() {
    test('should transition to sign-in route when signed out', function(assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = AuthenticatedRoute.create({
        session: { model: null },
        transitionTo: transitionToStub,
      });

      // Act
      route.beforeModel();

      // Assert
      assert.ok(transitionToStub.calledWithExactly('sign-in'));
    });

    test('should not transition to sign-in route when signed in', function(assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = AuthenticatedRoute.create({
        session: { model: 'foo' },
        transitionTo: transitionToStub,
      });

      // Act
      route.beforeModel();

      // Assert
      assert.ok(transitionToStub.notCalled);
    });
  });
});
