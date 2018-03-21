/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | profile/edit');

test('should update profile', async function(assert) {
  assert.expect(1);

  // Arrange
  await visit('/');
  await click('[data-test-top-bar-actions="edit-link"]');

  // Act
  await fillIn('[data-test-profile-form="display-name-field"] input', 'Bar');
  await fillIn('[data-test-profile-form="username-field"] input', 'Foo');
  await click('[data-test-profile-form="submit-button"]');

  // Assert
  assert.dom('[data-test-top-bar="name"]').hasText('Bar');
});
