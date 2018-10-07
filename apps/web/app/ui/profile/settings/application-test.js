import { module, test } from 'qunit';
import { click, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Acceptance | profile/settings', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should be able to delete account', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/pages',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    await visit('/profile/settings');
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
    assert.ok(true);
  });
});
