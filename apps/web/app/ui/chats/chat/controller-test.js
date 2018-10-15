import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Unit | Controller | chats/chat', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should update chat privacy', async function (assert) {
    assert.expect(4);

    // Arrange
    const controller = this.owner.lookup('controller:chats/chat');

    controller.set('model', await this.store.get('chat', 'site_a__page_a__user_e'));

    // Act
    await controller.handlePrivacyFormSubmit({ isPublicized: true, publicizedTitle: 'Foo' });

    // Assert
    const chatDocSnapshot = await this.db.doc('chats/site_a__page_a__user_e').get();

    assert.equal(chatDocSnapshot.get('isPublicized'), true);
    assert.equal(chatDocSnapshot.get('publicizedTitle'), 'Foo');

    const chat = await this.store.get('chat', 'site_a__page_a__user_e');

    assert.equal(chat.isPublicized, true);
    assert.equal(chat.publicizedTitle, 'Foo');
  });

  test('should toggle privacy form', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:chats/chat');

    // Act
    controller.handlePrivacyClick();

    // Assert
    assert.equal(controller.isPrivacyFormVisible, true);
  });
});
