import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | docs/installation/-components/route-content/wordpress guide', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('nothing to test', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{docs/installation/-components/route-content/wordpress-guide}}
    `);

    // Assert
    assert.ok(true);
  });
});
