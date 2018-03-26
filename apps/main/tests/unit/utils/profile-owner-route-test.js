import { module, test } from 'qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import ProfileOwnerRoute from 'main/utils/profile-owner-route';

module('Unit | Utility | profile-owner-route', () => {
  module('hook: beforeModel', () => {
    test('should transition to profile when current user does not own the profile', async (assert) => {
      assert.expect(2);

      // Arrange
      const transitionToStub = sinon.stub();
      const modelForProfile = EmberObject.create({ id: 'user_b' });
      const modelForStub = sinon.stub().returns(modelForProfile);
      const route = ProfileOwnerRoute.create({
        session: {
          model: { id: 'user_a' },
        },
        modelFor: modelForStub,
        transitionTo: transitionToStub,
      });

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(modelForStub.calledWithExactly('profile'));
      assert.ok(transitionToStub.calledWithExactly('profile'));
    });

    test('should not transition to profile when current user owns the profile', async (assert) => {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const modelForProfile = EmberObject.create({ id: 'user_a' });
      const modelForStub = sinon.stub().returns(modelForProfile);
      const route = ProfileOwnerRoute.create({
        session: {
          model: { id: 'user_a' },
        },
        modelFor: modelForStub,
        transitionTo: transitionToStub,
      });

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(transitionToStub.notCalled);
    });
  });
});
