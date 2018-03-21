/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | notifications');

test('should show notifications', async function(assert) {
  assert.expect(1);

  // Arrange
  await visit('/');

  // Act
  await click('[data-test-application="notification-link"]');

  // Assert
  assert.equal(currentURL(), '/notifications');
});
