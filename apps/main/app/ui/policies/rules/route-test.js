import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | policies/rules', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:policies/rules');
    assert.ok(route);
  });
});
