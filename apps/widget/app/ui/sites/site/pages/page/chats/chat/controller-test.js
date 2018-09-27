import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';

module('Unit | Controller | sites/site/pages/page/chats/chat', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('nothing to test so far', async function (assert) {
    assert.expect(1);

    const route = this.owner.lookup('route:sites/site/pages/page/chats/chat');

    assert.ok(route);
  });
});
