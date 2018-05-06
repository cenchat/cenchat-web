import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/index', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should show sites', async function (assert) {
    assert.expect(2);

    // Act
    await visit('/sites');

    // Assert
    assert.dom('[data-test-site-collection-item="site_a"]').exists();
    assert.dom('[data-test-site-collection-item="site_b"]').exists();
  });
});
