import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | docs/verify-site', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:docs/verify-site');
    assert.ok(route);
  });
});
