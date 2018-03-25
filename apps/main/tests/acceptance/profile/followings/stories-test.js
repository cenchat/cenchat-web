/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | profile/followings');

test('should show followings', async function(assert) {
  assert.expect(2);

  // Arrange
  await visit('/');

  // Act
  await click('[data-test-following-collection="see-all-link"]');

  // Assert
  assert.dom('.side-nav-outlet [data-test-user-collection-item="user_b"]').exists();
  assert.dom('.side-nav-outlet [data-test-user-collection-item="user_d"]').exists();
});
