import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/page/explore/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chats', await this.store.getAll('chat'));
    this.set('chatLimit', 12);
    this.set('onLoadMoreChatsClick', () => {});
  });

  test('should show <ChatCollection />', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/page/explore/-components/route-content/chat-collection');

    // Act
    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content
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
