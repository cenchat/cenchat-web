import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Acceptance | sites/site/pages/page', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should change URL', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'PATCH',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/api/pages/site_a__page_a',
      [204, {}, ''],
    );

    await visit('/sites/site_a/pages/site_a__page_a');

    // Act
    await fillIn('[data-test-main-content="url-field"] input', 'https://site-a.com/foo/bar');
    await click('[data-test-main-content="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('URL updated');
  });
});
