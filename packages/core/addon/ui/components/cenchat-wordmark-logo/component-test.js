import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cenchat-wordmark-logo', (hooks) => {
  setupRenderingTest(hooks);

  test('nothing to test so far', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{cenchat-wordmark-logo}}`);

    // Assert
    assert.ok(true);
  });
});
