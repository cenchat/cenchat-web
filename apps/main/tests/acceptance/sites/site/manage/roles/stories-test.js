import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Acceptance | sites/site/manage/roles', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);

    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/api/utils/update-site-roles',
      [204, {}, ''],
    );
  });

  test('should list admins', async (assert) => {
    assert.expect(2);

    // Act
    await visit('/sites/site_a/manage/roles');

    // Assert
    assert.dom('[data-test-roles] [data-test-user-list-item="user_a"]').exists();
    assert.dom('[data-test-roles] [data-test-user-list-item="user_c"]').exists();
  });

  test('should add admins', async (assert) => {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/manage/roles');

    // Act
    await fillIn('[data-test-roles] [data-test-main-content-form="search-field"] input', 'user_b');
    await click('[data-test-roles] [data-test-user-list-item="add-role-button"]');
    await click('[data-test-roles] [data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Roles saved');
  });

  test('should remove admins', async (assert) => {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/manage/roles');

    // Act
    await fillIn('[data-test-roles] [data-test-main-content-form="search-field"] input', 'user_c');
    await click('[data-test-roles] [data-test-user-list-item="remove-role-button"]');
    await click('[data-test-roles] [data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Roles saved');
  });
});
