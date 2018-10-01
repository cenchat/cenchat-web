import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should fetch session', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:application');
    const sessionFetchSpy = sinon.spy(route.session, 'fetch');

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(sessionFetchSpy.calledOnce);
  });

  test('should fetch current user model record when authenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:application');

    // Act
    await route.afterModel();

    // Assert
    assert.deepEqual(route.session.get('model').id, 'user_a');
  });
});
