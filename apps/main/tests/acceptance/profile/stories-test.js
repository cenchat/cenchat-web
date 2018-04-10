import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | profile', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should set username', async (assert) => {
    assert.expect(1);

    // Arrange
    await visit('/profile/user_a');

    // Act
    await fillIn('[data-test-missing-info-username="field"] input', 'user_a');
    await click('[data-test-missing-info-username="save-button"]');

    // Assert
    assert.dom('[data-test-missing-info="host"]').doesNotExist();
  });

  test('should show followings', async (assert) => {
    assert.expect(2);

    // Act
    await visit('/profile/user_a');

    // Assert
    assert.dom('[data-test-user-collection-item="user_b"]').exists();
    assert.dom('[data-test-user-collection-item="user_d"]').exists();
  });

  test('TODO: find a way to test this | should follow a user', async (assert) => {
    assert.expect(1);

    assert.ok(true);
  });

  test('TODO: find a way to test this | should unfollow a user in the current user\'s profile', async (assert) => {
    assert.expect(1);

    assert.ok(true);
  });

  test('TODO: find a way to test this | should unfollow a user in their own profile', async (assert) => {
    assert.expect(1);

    assert.ok(true);
  });
});
