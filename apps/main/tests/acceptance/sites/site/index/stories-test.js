import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Acceptance | sites/site/index', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);

    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/api/utils/verify-site',
      [204, {}, ''],
    );
  });

  test('should be able to verify site when not yet verified', async (assert) => {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_b');

    // Act
    await click('[data-test-main-content-verify-site="verify-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Site is now verified');
  });

  test('should transition to approved comments when site is verified', async (assert) => {
    assert.expect(1);

    // Act
    await visit('/sites/site_a');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/approved-comments');
  });
});
