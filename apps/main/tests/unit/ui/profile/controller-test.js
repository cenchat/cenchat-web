import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Unit | Controller | profile', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  module('function: handleSignOutClick', function() {
    test('should sign out', async function(assert) {
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

    test('should transition to home route after signing out', async function(assert) {
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

  module('function: handleUsernameSubmit', function() {
    test('should save username', async function(assert) {
      assert.expect(2);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const model = EmberObject.create({ save: saveStub });
      const controller = this.owner.lookup('controller:profile');

      controller.set('model', model);

      // Act
      await controller.handleUsernameSubmit('foobar', {
        preventDefault: sinon.stub(),
      });

      // Assert
      assert.equal(model.get('username'), 'foobar');
      assert.ok(saveStub.calledWithExactly({
        adapterOptions: { onServer: true },
      }));
    });
  });
});
