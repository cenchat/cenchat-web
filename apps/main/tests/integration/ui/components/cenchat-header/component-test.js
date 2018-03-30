import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | cenchat-header', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should make header fixed when fixed is true', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{cenchat-header --fixed=true}}`);

    // Assert
    assert.dom('[data-test-cenchat-header="host"]').hasAttribute('fixed');
  });

  test('should make header responsive when responsive is true', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{cenchat-header --responsive=true}}`);

    // Assert
    assert.dom('[data-test-cenchat-header="host"]').hasAttribute('responsive');
  });

  test('should make header multi-row when multi-row is true', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{cenchat-header --multiRow=true}}`);

    // Assert
    assert.dom('[data-test-cenchat-header="host"]').hasAttribute('multi-row');
  });
});
