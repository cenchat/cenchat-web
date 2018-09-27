import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/pages/page/explore', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list publicized chats', async function (assert) {
    assert.expect(3);

    // Act
    await visit('/sites/site_c/pages/page_a/explore');

    // Assert
    assert.dom('[data-test-chat-collection-item="site_c__page_a__user_a"]').exists();
    assert.dom('[data-test-chat-collection-item="site_c__page_a__user_b"]').exists();
    assert.dom('[data-test-chat-collection-item="site_c__page_a__user_d"]').doesNotExist();
  });

  test('should load more publicized chats when clicking more', async function (assert) {
    assert.expect(2);

    // Arrange
    await visit('/sites/site_c/pages/page_a/explore?chat_limit=1');

    // Act
    await click('[data-test-chat-collection="more-button"]');

    // Assert
    assert.dom('[data-test-chat-collection-item="site_c__page_a__user_a"]').exists();
    assert.dom('[data-test-chat-collection-item="site_c__page_a__user_b"]').exists();
  });
});
