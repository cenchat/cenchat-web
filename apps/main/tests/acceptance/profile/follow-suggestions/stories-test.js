import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | profile/follow-suggestions', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('TODO: figure out a way to test FB Graph API | should list follow suggestions', async (assert) => {
    assert.expect(1);

    assert.ok(true);
  });
});
