import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('nothing to test so far', async (assert) => {
    assert.expect(1);

    // Act
    await visit('/sites/site_a');

    // Assert
    assert.ok(true);
  });
});
