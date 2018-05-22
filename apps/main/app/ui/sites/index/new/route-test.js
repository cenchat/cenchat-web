import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sites/index/new', (hooks) => {
  setupTest(hooks);

  test('nothing to test so far', function (assert) {
    assert.expect(1);

    const route = this.owner.lookup('route:sites/index/new');

    assert.ok(route);
  });
});
