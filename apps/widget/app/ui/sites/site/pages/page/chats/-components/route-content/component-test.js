import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/site/pages/page/chats/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chats', await this.store.getAll('chat'));
    this.set('chatLimit', 12);
    this.set('onLoadMoreChatsClick', () => {});
  });

  test('should show <ChatList />', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/page/chats/-components/route-content/chat-list');

    // Act
    await render(hbs`
      {{sites/site/pages/page/chats/-components/route-content
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, {
      chats: 'array',
      chatLimit: 'number',
      onLoadMoreChatsClick: 'function',
    });
  });
});
