import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | profile', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: handleSignOutClick', () => {
    test('should sign out', async function (assert) {
      assert.expect(1);

      // Arrange
      const closeStub = sinon.stub().returns(stubPromise(true));
      const controller = this.owner.lookup('controller:profile');

      this.session.set('close', closeStub);
      controller.set('session', this.session);
      controller.set('transitionToRoute', sinon.stub());

      // Act
      await controller.handleSignOutClick();

      // Assert
      assert.ok(closeStub.calledOnce);
    });

    test('should transition to home route after signing out', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const controller = this.owner.lookup('controller:profile');

      controller.set('session', this.session);
      controller.set('transitionToRoute', transitionToStub);

      // Act
      await controller.handleSignOutClick();

      // Assert
      assert.ok(transitionToStub.calledWithExactly('home'));
    });
  });
});
