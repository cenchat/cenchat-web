import { click, visit, waitFor } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | sites/site/pages/page/chats', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list chats', async function (assert) {
    assert.expect(3);

    // Act
    await visit('/sites/site_a/pages/page_a/chats');

    // Assert
    assert.dom('[data-test-chat-list-item="site_a__page_a__user_b"]').exists();
    assert.dom('[data-test-chat-list-item="site_a__page_a__user_d"]').exists();
    assert.dom('[data-test-chat-list-item="site_a__page_a__user_e"]').exists();
  });

  test('should load more chats when clicking more', async function (assert) {
    assert.expect(3);

    // Arrange
    await visit('/sites/site_a/pages/page_a/chats?chat_limit=1');

    // Act
    await click('[data-test-chat-list="more-button"]');

    // Assert
    await waitFor('[data-test-chat-list-item="site_a__page_a__user_d"]');
    assert.dom('[data-test-chat-list-item="site_a__page_a__user_b"]').exists();
    assert.dom('[data-test-chat-list-item="site_a__page_a__user_d"]').exists();
    assert.dom('[data-test-chat-list-item="site_a__page_a__user_e"]').exists();
  });
});
