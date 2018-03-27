import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | docs/installation', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return capitalized params.platform as model', function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:docs/installation');

      // Act
      const result = route.model({ platform: 'universal' });

      // Assert
      assert.equal(result, 'Universal');
    });
  });
});
