/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | profile');

test('should set username', async function(assert) {
  assert.expect(1);

  // Arrange
  await visit('/');

  // Act
  await fillIn('[data-test-missing-info-username="field"] input', 'user_a');
  await click('[data-test-missing-info-username="save-button"]');

  // Assert
  assert.dom('[data-test-missing-info="host"]').doesNotExist();
});

test('should show followings', async function(assert) {
  assert.expect(2);

  // Act
  await visit('/');

  // Assert
  assert.dom('[data-test-following-collection-item="user_b"]').exists();
  assert.dom('[data-test-following-collection-item="user_d"]').exists();
});

test('TODO: find a way to test this | should follow a user', async function(assert) {
  assert.expect(1);

  assert.ok(true);
});

test('TODO: find a way to test this | should unfollow a user in the current user\'s profile', async function(assert) {
  assert.expect(1);

  assert.ok(true);
});

test('TODO: find a way to test this | should unfollow a user in their own profile', async function(assert) {
  assert.expect(1);

  assert.ok(true);
});
