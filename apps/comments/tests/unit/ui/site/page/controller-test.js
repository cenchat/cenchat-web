import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubSession } from '@cenchat/core/test-support';

module('Unit | Controller | site/page', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.session = stubSession(this);
  });

  module('getter/setter: filterCommentsBy', function() {
    test('should return relevance when signed in', function(assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:site/page');

      controller.set('session', { model: {} });

      // Act
      const result = controller.get('filterCommentsBy');

      // Assert
      assert.equal(result, 'relevance');
    });

    test('should return all when signed out', function(assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:site/page');

      controller.set('session', { model: null });

      // Act
      const result = controller.get('filterCommentsBy');

      // Assert
      assert.equal(result, 'all');
    });
  });
});
