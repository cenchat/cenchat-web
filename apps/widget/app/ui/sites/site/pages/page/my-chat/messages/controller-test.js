import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | sites/site/pages/page/my-chat/messages', function (hooks) {
  setupTest(hooks);

  test('should increase message limit', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/pages/page/my-chat/messages');

    controller.set('model', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    // Act
    controller.handleScrollToTop();

    // Assert
    assert.equal(controller.messageLimit, 18);
  });
});
