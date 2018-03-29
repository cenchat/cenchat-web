/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search');

test('should search for user', async (assert) => {
  assert.expect(3);

  // Arrange
  await visit('/');
  await click('[data-test-application="search-link"]');

  // Act
  await fillIn('[data-test-search-top-bar="field"] input', 'user');

  // Assert
  assert.dom('[data-test-user-collection-item="user_b"]').exists();
  assert.dom('[data-test-user-collection-item="user_c"]').exists();
  assert.dom('[data-test-user-collection-item="user_d"]').exists();
});
