/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sites/index');

test('should show user sites', async (assert) => {
  assert.expect(2);

  // Arrange
  await visit('/');

  // Act
  await click('[data-test-application="sites-link"]');

  // Assert
  assert.dom('[data-test-site-collection-item="site_a"]').exists();
  assert.dom('[data-test-site-collection-item="site_b"]').exists();
});
