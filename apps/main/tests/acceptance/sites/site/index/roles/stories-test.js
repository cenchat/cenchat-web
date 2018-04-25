import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/index/roles', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list admins', async (assert) => {
    assert.expect(2);

    // Act
    await visit('/sites/site_a/roles');

    // Assert
    assert.dom('[data-test-roles] [data-test-user-list-item="user_a"]').exists();
    assert.dom('[data-test-roles] [data-test-user-list-item="user_c"]').exists();
  });

  test('should add admins', async function (assert) {
    assert.expect(2);

    // Arrange
    await visit('/sites/site_a/roles');

    // Act
    await fillIn('[data-test-roles] [data-test-main-content-form="search-field"] input', 'user_b');
    await click('[data-test-roles] [data-test-user-list-item="add-role-button"]');
    await click('[data-test-roles] [data-test-top-bar="save-button"]');

    // Assert
    const adminDocSnapshot = await this.db
      .collection('sites')
      .doc('site_a')
      .collection('admins')
      .doc('user_b')
      .get();

    assert.ok(adminDocSnapshot.exists);

    const sitesAsAdminDocSnapshot = await this.db
      .collection('users')
      .doc('user_b')
      .collection('sitesAsAdmin')
      .doc('site_a')
      .get();

    assert.ok(sitesAsAdminDocSnapshot.exists);
  });

  test('should remove admins', async function (assert) {
    assert.expect(2);

    // Arrange
    await visit('/sites/site_a/roles');

    // Act
    await fillIn('[data-test-roles] [data-test-main-content-form="search-field"] input', 'user_c');
    await click('[data-test-roles] [data-test-user-list-item="remove-role-button"]');
    await click('[data-test-roles] [data-test-top-bar="save-button"]');

    // Assert
    const adminDocSnapshot = await this.db
      .collection('sites')
      .doc('site_a')
      .collection('admins')
      .doc('user_c')
      .get();

    assert.notOk(adminDocSnapshot.exists);

    const sitesAsAdminDocSnapshot = await this.db
      .collection('users')
      .doc('user_c')
      .collection('sitesAsAdmin')
      .doc('site_a')
      .get();

    assert.notOk(sitesAsAdminDocSnapshot.exists);
  });
});
