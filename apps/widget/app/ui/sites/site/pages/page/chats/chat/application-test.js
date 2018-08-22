import {
  click,
  fillIn,
  visit,
  waitFor,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/pages/page/chats/chat', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should send text message', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_c/pages/page_a/chats/site_c__page_a__user_a');

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
    await visit('/sites/site_c/pages/page_a/chats/site_c__page_a__user_a');

    // Act
    await click('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]');
    await click('[data-test-chat-composer-sub-toolbar="sticker-button"]');
    await click('[data-test-sticker-list="sticker_a1"]');

    // Assert
    await waitFor('[data-test-message-list="content"]', { count: 4 });
    assert.dom('[data-test-message-list="content"]').exists({ count: 4 });
  });
});
