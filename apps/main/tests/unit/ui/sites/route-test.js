import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubService } from '@cenchat/core/test-support';

module('Unit | Route | sites', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    stubService(this, 'session', {});
  });

  module('hook: model', function() {
    test('should return session model', async function(assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:sites');

      route.set('session', { model: 'foo' });

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result, 'foo');
    });
  });
});
