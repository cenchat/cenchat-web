import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';

module('Unit | Route | docs/installation', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return lowercased params.platform', function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:docs/installation');

      // Act
      const result = route.model({ platform: 'Universal' });

      // Assert
      assert.equal(result, 'universal');
    });
  });
});
