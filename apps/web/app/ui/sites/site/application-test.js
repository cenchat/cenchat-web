import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Acceptance | sites/site', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);

    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/utils/verify-site',
      [200, {}, ''],
    );
  });

  test('should be able to verify site when not yet verified', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_b');

    // Act
    await click('[data-test-verify-site="verify-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Site is now verified');
  });
});
