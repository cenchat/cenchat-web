import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | profile', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should show followings', async function (assert) {
    assert.expect(2);

    // Act
    await visit('/profile/user_a');

    // Assert
    assert.dom('[data-test-user-collection-item="user_b"]').exists();
    assert.dom('[data-test-user-collection-item="user_d"]').exists();
  });

  test('TODO: find a way to test this | should follow a user', async function (assert) {
    assert.expect(1);

    assert.ok(true);
  });

  test('TODO: find a way to test this | should unfollow a user in the current user\'s profile', async function (assert) {
    assert.expect(1);

    assert.ok(true);
  });

  test('TODO: find a way to test this | should unfollow a user in their own profile', async function (assert) {
    assert.expect(1);

    assert.ok(true);
  });
});
