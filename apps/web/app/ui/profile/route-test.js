import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Unit | Route | profile', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return session model as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:profile');

    // Act
    const result = await route.model();

    // Assert
    assert.deepEqual(result, this.session.get('model'));
  });
});
