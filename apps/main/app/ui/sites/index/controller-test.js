import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | sites/index', (hooks) => {
  setupTest(hooks);

  test('nothing to test so far', async function (assert) {
    assert.expect(1);

    const controller = this.owner.lookup('controller:sites/index');

    assert.ok(controller);
  });
});
