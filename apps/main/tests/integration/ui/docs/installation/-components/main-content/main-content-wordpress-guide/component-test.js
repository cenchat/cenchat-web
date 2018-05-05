import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | docs/installation/-components/main-content/main-content-wordpress-guide', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('nothing to test so far', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{docs/installation/-components/main-content/main-content-wordpress-guide}}
    `);

    // Assert
    assert.ok(true);
  });
});
