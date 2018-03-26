import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | cloud-firestore', (hooks) => {
  setupTest(hooks);

  test('nothing to test', function (assert) {
    const adapter = this.owner.lookup('adapter:cloud-firestore');
    assert.ok(adapter);
  });
});
