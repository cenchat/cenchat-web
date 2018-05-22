import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Route | site', (hooks) => {
  setupTest(hooks);

  module('hook: afterModel', () => {
    test('should set theme', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:site');

      // Act
      await route.afterModel(EmberObject.create({ theme: 'light' }));

      // Assert
      assert.ok(document.body.classList.contains('light-theme'));
    });
  });
});
