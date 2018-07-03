import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Acceptance | sites/site/pages', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list pages', async function (assert) {
    assert.expect(2);

    // Act
    await visit('/sites/site_a/pages');

    // Assert
    assert.dom('[data-test-page-collection-item="site_a__page_a"]').exists();
    assert.dom('[data-test-page-collection-item="site_a__page_b"]').exists();
  });

  test('should rescrape page', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'PATCH',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/api/utils/rescrape-page/site_a__page_a',
      [204, {}, ''],
    );

    await visit('/sites/site_a/pages');

    // Act
    await click('[data-test-page-collection-item="rescrape-page-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Page rescraped');
  });
});
