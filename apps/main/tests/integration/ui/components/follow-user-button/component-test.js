import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | follow-user-button', (hooks) => {
  setupRenderingTest(hooks);

  test('nothing to test so far', async (assert) => {
    assert.expect(1);

    await render(hbs`{{follow-user-button}}`);

    assert.ok(true);
  });
});
