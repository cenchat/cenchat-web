import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/pages/page/explore/-components/route-content/chat-collection', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const chats = await this.store.getAll('chat');

    this.set('chats', chats.filter(chat => chat.isPublicized));
    this.set('chatLimit', 12);
    this.set('onLoadMoreChatsClick', () => {});
  });

  test('should show <ChatCollectionItem /> per each chat', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/page/explore/-components/route-content/chat-collection/chat-collection-item');

    // Act
    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content/chat-collection
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.notOk(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, { chat: 'object' });
  });

  test('should show empty state when there are no chats', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chats', []);

    // Act
    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content/chat-collection
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-collection="empty-state"]').exists();
  });

  test('should hide empty state when there are chats', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content/chat-collection
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-collection="empty-state"]').doesNotExist();
  });

  test('should show more button when number of chats is equal to chatLimit', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chatLimit', 4);

    // Act
    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content/chat-collection
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-collection="more-button"]').exists();
  });

  test('should hide more button when number of chats is less than the chatLimit', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content/chat-collection
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-collection="more-button"]').doesNotExist();
  });

  test('should fire an external action when clicking show more button', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chatLimit', 4);

    const spy = sinon.spy(this, 'onLoadMoreChatsClick');

    await render(hbs`
      {{sites/site/pages/page/explore/-components/route-content/chat-collection
          --chats=chats
          --chatLimit=chatLimit
          --onLoadMoreChatsClick=(action onLoadMoreChatsClick)}}
    `);

    // Act
    await click('[data-test-chat-collection="more-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
