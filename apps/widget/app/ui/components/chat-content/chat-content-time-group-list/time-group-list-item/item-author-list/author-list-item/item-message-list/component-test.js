import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('author', {
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
    });
  });

  test('should show author display name', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list
          --author=author}}
    `);

    // Assert
    assert.dom('[data-test-item-message-list="author-name"]').hasText('User A');
  });

  test('should show <MessageListItem /> per every author message', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list/message-list-item');

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list
          --author=author}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      firebase: 'instance',
      store: 'object',
      message: 'object',
    });
  });
});
