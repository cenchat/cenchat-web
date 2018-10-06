import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | profile', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('nothing to test so far', async function (assert) {
    assert.expect(1);

    visit('/profile');

    assert.ok(true);
  });
});
