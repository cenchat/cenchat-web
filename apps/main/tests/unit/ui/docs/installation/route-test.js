import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | docs/installation', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return params.platform', function (assert) {
      assert.expect(1);

      // Arrange
      const platform = { id: 'universal' };
      const route = this.owner.lookup('route:docs/installation');

      // Act
      const result = route.model({ platform });

      // Assert
      assert.deepEqual(result, platform);
    });
  });
});
