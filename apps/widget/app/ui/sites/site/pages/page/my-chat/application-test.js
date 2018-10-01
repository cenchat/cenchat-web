import {
  click,
  currentURL,
  fillIn,
  visit,
  waitFor,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | sites/site/pages/page/my-chat', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should create chat', async function (assert) {
    assert.expect(2);

    // Arrange
    await visit('/sites/site_d/pages/page_a/my-chat');

    // Act
    await fillIn('[data-test-chat-composer-main-toolbar="field"]', 'Hi');
    await click('[data-test-chat-composer-main-toolbar="send-button"]');

    // Assert
    await waitFor('[data-test-message-list="content"]');
    assert.equal(currentURL(), '/sites/site_d/pages/page_a/my-chat/messages');
    assert.dom('[data-test-message-list="content"]').hasText('Hi');
  });

  test('should send text message', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_c/pages/page_a/my-chat');

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
    await visit('/sites/site_c/pages/page_a/my-chat');

    // Act
    await click('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]');
    await click('[data-test-chat-composer-sub-toolbar="sticker-button"]');
    await click('[data-test-sticker-list="sticker_a1"]');

    // Assert
    await waitFor('[data-test-message-list="content"]', { count: 4 });
    assert.dom('[data-test-message-list="content"]').exists({ count: 4 });
  });
});
