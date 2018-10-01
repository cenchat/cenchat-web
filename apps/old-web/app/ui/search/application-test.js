import { fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | search', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should search for user', async function (assert) {
    assert.expect(3);

    // Arrange
    await visit('/search');

    // Act
    await fillIn('[data-test-search-top-bar="field"] input', '@user');

    // Assert
    assert.dom('[data-test-user-collection-item="user_b"]').exists();
    assert.dom('[data-test-user-collection-item="user_c"]').exists();
    assert.dom('[data-test-user-collection-item="user_d"]').exists();
  });
});
