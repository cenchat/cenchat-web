import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/manage', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should transition to sites.site.manage.roles when clicking roles', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/manage');

    // Act
    await click('[data-test-manage-list="roles-link"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/manage/roles');
  });
});
