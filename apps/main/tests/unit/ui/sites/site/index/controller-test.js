import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | sites/site/index', (hooks) => {
  setupTest(hooks);

  module('function: handleVerifySiteClick', () => {
    test('TODO: find a way to test this | should verify site', async function (assert) {
      assert.expect(1);

      const controller = this.owner.lookup('controller:sites/site/index');

      assert.ok(controller);
    });
  });
});
