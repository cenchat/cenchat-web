import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Route | chats', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should transition to sign-in when unauthenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:chats');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    route.set('session.content.isAuthenticated', false);

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(transitionToStub.calledWithExactly('sign-in'));
  });

  test('should return current user\'s chats as model', async function (assert) {
    assert.expect(2);

    // Arrange
    const route = this.owner.lookup('route:chats');

    // Act
    const result = await route.model({ chatLimit: null });

    // Assert
    assert.equal(result.length, 4);
    assert.equal(result[0].id, 'site_a__page_a__user_b');
  });
});
