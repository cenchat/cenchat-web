import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sites', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return current user sites as admin', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:sites');

      route.set('session', {
        model: { sitesAsAdmin: 'foo' },
      });

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result, 'foo');
    });
  });
});
