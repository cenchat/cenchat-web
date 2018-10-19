import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Unit | Route | sites', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should use current user sites as the model', async function (assert) {
    assert.expect(2);

    // Arrange
    const route = this.owner.lookup('route:sites');

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.length, 2);
    assert.equal(result[0].id, 'site_a');
  });
});
