import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | notifications', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should show notifications', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/notifications');

    // Assert
    assert.dom('[data-test-notification-list-follow-item="host"]').exists({ count: 1 });
  });
});
