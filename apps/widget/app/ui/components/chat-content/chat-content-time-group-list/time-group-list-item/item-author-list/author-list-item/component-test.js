import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('author', {
      id: 'user_a',
      displayName: 'User A',
      messages: [
        {
          createdOn: new Date('2017-01-01'),
          text: 'Message A',
        },
        {
          createdOn: new Date('2017-01-01'),
          text: 'Message B',
        },
      ],
      photoUrl: 'user_a.jpg',
    });
  });

  test('should set right group class when author is the current user', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item
          --session=(lookup 'service:session')
          --author=author}}
    `);

    // Assert
    assert.dom('[data-test-author-list-item="user_a"]').hasClass('chat-content-time-group-list-item-author-list-item__right-author-group');
  });

  test('should set left group class when author is not the current user', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('author.id', 'user_b');

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item
          --session=(lookup 'service:session')
          --author=author}}
    `);

    // Assert
    assert.dom('[data-test-author-list-item="user_b"]').hasClass('chat-content-time-group-list-item-author-list-item__left-author-group');
  });

  test('should show author photo', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item
          --session=(lookup 'service:session')
          --author=author}}
    `);

    // Assert
    assert.dom('[data-test-author-list-item="author-photo"]').hasAttribute('src', 'user_a.jpg');
    assert.dom('[data-test-author-list-item="author-photo"]').hasAttribute('alt', 'User A');
  });

  test('should show <ItemMessageList />', async function (assert) {
    assert.expect(1);

    // Assert
    const spy = spyComponent(this, 'chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list');

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item
          --session=(lookup 'service:session')
          --author=author}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { author: 'object' });
  });
});
