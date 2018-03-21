/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sites/site');

test('should list pages', async function(assert) {
  assert.expect(2);

  // Arrange
  await visit('/');
  await click('[data-test-application="sites-link"]');

  // Act
  await click('[data-test-site-collection-item="site_a"] > div');

  // Assert
  assert.dom('[data-test-page-collection-item="site_a__page_a"]').exists();
  assert.dom('[data-test-page-collection-item="site_a__page_b"]').exists();
});
