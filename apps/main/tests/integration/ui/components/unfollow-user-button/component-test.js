import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | unfollow-user-button', function(hooks) {
  setupRenderingTest(hooks);

  test('nothing to test so far', async function(assert) {
    assert.expect(1);

    await render(hbs`{{unfollow-user-button}}`);

    assert.ok(true);
  });
});
