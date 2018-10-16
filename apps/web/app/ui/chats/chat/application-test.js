import {
  click,
  fillIn,
  visit,
  waitFor,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | chats/chat', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should send text message', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('chats/site_c__page_a__user_a');

    // Act
    await fillIn('[data-test-chat-composer-main-toolbar="field"]', 'Foo');
    await click('[data-test-chat-composer-main-toolbar="send-button"]');

    // Assert
    await waitFor('[data-test-message-list="content"]', { count: 4 });
    assert.dom('[data-test-message-list="content"]').exists({ count: 4 });
  });

  test('should send sticker message', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('chats/site_c__page_a__user_a');

    // Act
    await click('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]');
    await click('[data-test-chat-composer-sub-toolbar="sticker-button"]');
    await click('[data-test-sticker-list="sticker_a1"]');

    // Assert
    await waitFor('[data-test-message-list="content"]', { count: 4 });
    assert.dom('[data-test-message-list="content"]').exists({ count: 4 });
  });

  test('should update chat privacy', async function (assert) {
    assert.expect(4);

    // Arrange
    await visit('chats/site_a__page_a__user_e');

    // Act
    await click('[data-test-route-header="privacy-button"]');
    await fillIn('[data-test-privacy-form="publicized-title-field"] input', 'Foo');
    await fillIn('[data-test-privacy-form="visible-to-field"] select', 'true');
    await click('[data-test-privacy-form="submit-button"]');

    // Assert
    const chatDocSnapshot = await this.db.doc('chats/site_a__page_a__user_e').get();

    assert.equal(chatDocSnapshot.get('isPublicized'), true);
    assert.equal(chatDocSnapshot.get('publicizedTitle'), 'Foo');

    const chat = await this.store.get('chat', 'site_a__page_a__user_e');

    assert.equal(chat.isPublicized, true);
    assert.equal(chat.publicizedTitle, 'Foo');
  });
});
