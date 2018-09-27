import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | sites/site/pages/page/chats', function (hooks) {
  setupTest(hooks);

  test('should increase chat limit', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/pages/page/chats');

    // Act
    controller.handleLoadMoreChatsClick();

    // Assert
    assert.equal(controller.chatLimit, 18);
  });
});
