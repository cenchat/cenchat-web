import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Unit | Route | profile', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  module('hook: model', () => {
    test('should return record that matches a username', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:profile');

      // Act
      const result = await route.model({ user_id: 'user_b' });

      // Assert
      assert.equal(result.get('id'), 'user_b');
    });

    test('should return record that matches an ID if querying for a username returns nothing', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:profile');

      // Act
      const result = await route.model({ user_id: 'user_a' });

      // Assert
      assert.equal(result.get('id'), 'user_a');
    });
  });
});
