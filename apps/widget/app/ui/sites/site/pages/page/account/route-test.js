import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Unit | Route | sites/site/pages/page/account', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return the signed in user as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/account');

    // Act
    const result = await route.model({ user_id: 'user_a' });

    // Assert
    assert.deepEqual(result, await this.store.get('user', 'user_a'));
  });
});
