import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/pages/page/chats/-components/route-content/chat-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chats', await this.store.getAll('chat'));
    this.set('chatLimit', 12);
    this.set('onLoadMoreChatsClick', () => {});
  });

  test('should show <ChatListItem /> for every chat', async function (assert) {
    assert.expect(2);

    // Assert
    const spy = spyComponent(this, 'sites/site/pages/page/chats/-components/route-content/chat-list/chat-list-item');

    // Act
    await render(hbs`
      {{sites/site/pages/page/chats/-components/route-content/chat-list
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.notOk(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, { session: 'instance', chat: 'object' });
  });

  test('should show empty state when there are no chats', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chats', []);

    // Act
    await render(hbs`
      {{sites/site/pages/page/chats/-components/route-content/chat-list
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-list="empty-state"]').exists();
  });

  test('should hide empty state when there are chats', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/chats/-components/route-content/chat-list
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-list="empty-state"]').doesNotExist();
  });

  test('should show more button when number of chats is equal to chatLimit', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chatLimit', 6);

    // Act
    await render(hbs`
      {{sites/site/pages/page/chats/-components/route-content/chat-list
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-list="more-button"]').exists();
  });

  test('should hide more button when number of chats is less than the chatLimit', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/chats/-components/route-content/chat-list
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-list="more-button"]').doesNotExist();
  });

  test('should fire an external action when clicking show more button', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chatLimit', 6);

    const spy = sinon.spy(this, 'onLoadMoreChatsClick');

    await render(hbs`
      {{sites/site/pages/page/chats/-components/route-content/chat-list
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Act
    await click('[data-test-chat-list="more-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
