import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | profile/edit', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should update profile', async (assert) => {
    assert.expect(1);

    // Arrange
    await visit('/profile/user_a/edit');

    // Act
    await fillIn('[data-test-profile-form="display-name-field"] input', 'Bar');
    await fillIn('[data-test-profile-form="username-field"] input', 'Foo');
    await click('[data-test-profile-form="submit-button"]');

    // Assert
    assert.dom('[data-test-top-bar="name"]').hasText('Bar');
  });
});
