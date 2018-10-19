import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Unit | Route | sites/new', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('nothing to test so far', async function (assert) {
    assert.expect(1);

    assert.ok(this.owner.lookup('route:sites/new'));
  });
});
