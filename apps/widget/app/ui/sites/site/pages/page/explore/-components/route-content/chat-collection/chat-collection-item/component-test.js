import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/page/explore/-components/route-content/chat-collection/chat-collection-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const chats = await this.store.getAll('chat');

    this.set('chat', chats.filter(chat => chat.isPublicized)[0]);
  });

  test('should show chat', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content/chat-collection/chat-collection-item
          --chat=chat}}
    `);

    // Assert
    assert.dom('[data-test-chat-collection-item="author-photo"]').hasAttribute(
      'src',
      'user_a.jpg',
    );
    assert.dom('[data-test-chat-collection-item="author-name"]').hasText('User A');
    assert.dom('[data-test-chat-collection-item="name"]').hasText('Publicized Chat');
  });
});
