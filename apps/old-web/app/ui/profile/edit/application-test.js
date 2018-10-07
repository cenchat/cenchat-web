import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | profile/edit', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should update profile', async function (assert) {
    assert.expect(3);

    // Arrange
    await visit('/profile/user_a/edit');

    // Act
    await fillIn('[data-test-profile-form="display-name-field"] input', 'Display Name');
    await fillIn('[data-test-profile-form="short-bio-field"] input', 'Short Bio');
    await fillIn('[data-test-profile-form="username-field"] input', 'Username');
    await click('[data-test-profile-form="submit-button"]');

    // Assert
    assert.dom('[data-test-top-bar="name"]').hasText('Display Name');
    assert.dom('[data-test-main-content-info="short-bio"]').hasText('Short Bio');
    assert.dom('[data-test-main-content-info="username"]').hasText('@Username');
  });
});
