import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | comment', (hooks) => {
  setupTest(hooks);

  module('serialize', () => {
    // Hard to test due to `this._super()`
    test('nothing to test', function (assert) {
      assert.expect(1);

      assert.ok(this.owner.lookup('serializer:comment'));
    });
  });
});
