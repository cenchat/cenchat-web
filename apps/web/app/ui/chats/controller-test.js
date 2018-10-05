import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | chats', function (hooks) {
  setupTest(hooks);

  test('should increase chat limit', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:chats');

    // Act
    controller.handleLoadMoreChatsClick();

    // Assert
    assert.equal(controller.chatLimit, 18);
  });
});
