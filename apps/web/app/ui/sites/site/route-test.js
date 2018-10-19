import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Unit | Route | sites/site', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should use site as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site');

    // Act
    const result = await route.model({ site_id: 'site_a' });

    // Assert
    assert.deepEqual(result, await this.store.get('site', 'site_a'));
  });
});
