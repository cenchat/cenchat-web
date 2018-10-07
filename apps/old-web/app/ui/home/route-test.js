import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | home', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: beforeModel', () => {
    test('should transition to profile using username when signed in', async function (assert) {
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

    test('should transition to profile using id when signed in and username is unavailable', async function (assert) {
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

    test('should not transition to any route when signed out', async function (assert) {
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

  module('hook: afterModel', () => {
    test('should set headData', async function (assert) {
      assert.expect(5);

      // Arrange
      const route = this.owner.lookup('route:home');

      // Act
      await route.afterModel();

      // Assert
      assert.equal(route.get('headData.title'), 'Cenchat – civilized commenting service');
      assert.equal(route.get('headData.description'), 'Cenchat is a commenting service with a unique way to prevent trolls, harassment, negativity, and spam to happen around your work');
      assert.equal(route.get('headData.image'), 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e');
      assert.equal(route.get('headData.url'), 'https://cenchat.com');
      assert.equal(route.get('headData.type'), 'website');
    });
  });
});
