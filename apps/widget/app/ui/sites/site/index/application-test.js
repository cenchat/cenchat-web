import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import sinon from 'sinon';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/index', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should create page and redirect to it when page does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/pages',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    // Act
    await visit('/sites/site_a?slug=foobardee');

    // Assert
    assert.notEqual(currentURL(), '/sites/site_a?slug=foobardee');
  });
});
