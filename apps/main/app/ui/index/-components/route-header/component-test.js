import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | index/-components/route-header', function (hooks) {
  setupRenderingTest(hooks);

  test('nothing to test so far', async function (assert) {
    assert.expect(1);

    await render(hbs`{{index/-components/route-header}}`);
    assert.ok(true);
  });
});
