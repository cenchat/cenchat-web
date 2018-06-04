import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubService } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sign in', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    stubService(this, 'session', {});
  });

  module('hook: beforeModel', () => {
    test('should transition to home route when signed in', function (assert) {
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

  module('hook: afterModel', () => {
    test('should set headData', async function (assert) {
      assert.expect(5);

      // Arrange
      const route = this.owner.lookup('route:sign-in');

      // Act
      await route.afterModel();

      // Assert
      assert.equal(route.get('headData.title'), 'Cenchat');
      assert.equal(route.get('headData.description'), 'Sign in');
      assert.equal(route.get('headData.image'), 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e');
      assert.equal(route.get('headData.url'), 'https://cenchat.com/sign-in');
      assert.equal(route.get('headData.type'), 'website');
    });
  });
});
