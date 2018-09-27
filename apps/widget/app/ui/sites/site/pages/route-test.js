import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sites/site/pages', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:sites/site/pages');
    assert.ok(route);
  });
});
