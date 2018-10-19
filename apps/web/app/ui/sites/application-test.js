import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | sites', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list sites', async function (assert) {
    assert.expect(2);

    // Act
    await visit('/sites');

    // Assert
    assert.dom('[data-test-site-collection-item="site_a"]').exists();
    assert.dom('[data-test-site-collection-item="site_b"]').exists();
  });
});
