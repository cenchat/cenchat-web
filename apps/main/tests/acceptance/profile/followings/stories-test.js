import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | profile/followings', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should show followings', async (assert) => {
    assert.expect(2);

    // Act
    await visit('/profile/user_a/followings');

    // Assert
    assert.dom('.side-nav-outlet [data-test-user-collection-item="user_b"]').exists();
    assert.dom('.side-nav-outlet [data-test-user-collection-item="user_d"]').exists();
  });
});
