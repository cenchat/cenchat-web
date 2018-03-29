import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | search', (hooks) => {
  setupTest(hooks);

  test('function: handleSearchInput', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:search');

    // Act
    controller.handleSearchInput('foo');

    // Assert
    assert.equal(controller.get('query'), 'foo');
  });
});
