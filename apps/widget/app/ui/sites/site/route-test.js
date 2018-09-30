import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Unit | Route | sites/site', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return site as model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site');

    // Act
    const result = await route.model({ site_id: 'site_a' });

    // Assert
    assert.equal(result.id, 'site_a');
  });

  test('should set theme', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site');

    // Act
    await route.afterModel({ theme: 'light' });

    // Assert
    assert.ok(document.body.classList.contains('light-theme'));
  });
});
