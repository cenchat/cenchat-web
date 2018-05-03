import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/manage/-components/manage-list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('nothing to test so far', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/manage/-components/manage-list}}
    `);

    // Assert
    assert.ok(true);
  });
});
