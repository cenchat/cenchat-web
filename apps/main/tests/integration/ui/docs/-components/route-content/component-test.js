import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | docs/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('nothing to test', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{docs/-components/route-content}}`);

    // Assert
    assert.ok(true);
  });
});
