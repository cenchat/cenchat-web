import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';

module('Unit | Route | search', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', function () {
    test('should query for user using their username', async function (assert) {
      assert.expect(2);

      // Arrange
      const userB = await this.store.findRecord('user', 'user_b');
      const route = this.owner.lookup('route:search');

      // Act
      const result = await route.model({ query: '@user_' });

      // Assert
      assert.deepEqual(result.get('firstObject'), userB);
      assert.equal(result.get('length'), 3);
    });

    test('should query for user using their name', async function (assert) {
      assert.expect(2);

      // Arrange
      const userA = await this.store.findRecord('user', 'user_a');
      const route = this.owner.lookup('route:search');

      // Act
      const result = await route.model({ query: 'user' });

      // Assert
      assert.deepEqual(result.get('firstObject'), userA);
      assert.equal(result.get('length'), 4);
    });
  });
});
