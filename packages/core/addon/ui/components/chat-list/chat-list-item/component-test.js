import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | chat-list/chat-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
    this.set('urlPrefix', 'foo.bar');
  });

  test('should show chat', async function (assert) {
    assert.expect(4);

    // Act
    await render(hbs`
      {{chat-list/chat-list-item
        --session=(lookup 'service:session')
        --chat=chat
        --urlPrefix=urlPrefix
      }}
    `);

    // Assert
    assert.dom('[data-test-chat-list-item="author-photo"]').hasAttribute('src', 'user_a.jpg');
    assert.dom('[data-test-chat-list-item="title"]').hasText('User A');
    assert.dom('[data-test-chat-list-item="description"]').hasText('User C: Message C');
    assert.dom('[data-test-chat-list-item="timestamp"]').exists();
  });
});
