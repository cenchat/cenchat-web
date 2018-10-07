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

  test('should be able to verify site when not yet verified', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_b');

    // Act
    await click('[data-test-main-content-verify-site="verify-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Site is now verified');
  });

  test('should transition to sites.site.index.approved-comments when site is verified', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/approved-comments');
  });

  test('should transition to sites.site.pages when clicking pages', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a');

    // Act
    await click('[data-test-top-bar="pages-link"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages');
  });

  test('should transition to sites.site.manage when clicking manage', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a');

    // Act
    await click('[data-test-top-bar="manage-link"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/manage');
  });

  test('should transition to docs when clicking docs', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a');

    // Act
    await click('[data-test-top-bar="docs-link"]');

    // Assert
    assert.equal(currentURL(), '/docs');
  });

  test('should transition to sites.site.index.approved-comments when clicking approved comments', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a');

    // Act
    await click('[data-test-top-bar="approved-comments-link"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/approved-comments');
  });

  test('should transition to sites.site.index.rejected-comments when clicking rejected comments', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a');

    // Act
    await click('[data-test-top-bar="rejected-comments-link"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/rejected-comments');
  });
});
