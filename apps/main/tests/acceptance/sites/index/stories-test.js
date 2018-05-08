import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/index', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should transition to sites.index.new when clicking new', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites');

    // Act
    await click('[data-test-sites-index="new-link"]');

    // Assert
    assert.equal(currentURL(), '/sites/new');
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
