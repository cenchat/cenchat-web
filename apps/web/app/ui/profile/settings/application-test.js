import { module, test } from 'qunit';
import { click, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | profile/settings', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should be able to delete account', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/profile/user_a/settings');
    await click('[data-test-security-settings-delete-account="delete-button"]');

    const confirmationKey = this.element
      .querySelector('[data-test-security-settings-delete-account="confirm-field"] div')
      .textContent
      .trim()
      .substr(26, 5);

    await fillIn(
      '[data-test-security-settings-delete-account="confirm-field"] input',
      confirmationKey,
    );

    // Act
    await click('[data-test-security-settings-delete-account="confirm-delete-button"]');

    // Assert
    const userADocSnapshot = await this.db.collection('users').doc('user_a').get();

    assert.notOk(userADocSnapshot.exists);
  });
});
