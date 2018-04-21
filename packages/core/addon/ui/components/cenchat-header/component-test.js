import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | cenchat-header', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show yield', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{#cenchat-header responsive=true}}
        <div data-test="yield">Foo</div>
      {{/cenchat-header}}
    `);

    // Assert
    assert.dom('[data-test="yield"]').exists();
  });

  test('should make header responsive when responsive is true', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{cenchat-header responsive=true}}`);

    // Assert
    assert.dom('[data-test-cenchat-header="host"]').hasAttribute('responsive');
  });

  test('should make header multi-row when multi-row is true', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{cenchat-header multi-row=true}}`);

    // Assert
    assert.dom('[data-test-cenchat-header="host"]').hasAttribute('multi-row');
  });
});
