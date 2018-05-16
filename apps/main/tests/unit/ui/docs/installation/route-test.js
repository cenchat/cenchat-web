import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | docs/installation', (hooks) => {
  setupTest(hooks);

  test('nothing to test so far', function (assert) {
    assert.expect(1);

    const route = this.owner.lookup('route:docs/installation');

    assert.ok(route);
  });
});
