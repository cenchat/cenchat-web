import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/pages', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list pages', async function (assert) {
    assert.expect(2);

    // Act
    await visit('/sites/site_a/pages');

    // Assert
    assert.dom('[data-test-page-collection-item="site_a__page_a"]').exists();
    assert.dom('[data-test-page-collection-item="site_a__page_b"]').exists();
  });
});