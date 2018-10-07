import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list/message-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('message', await this.store.get('message', 'message_a'));
  });

  test('should show text message', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list/message-list-item
          --firebase=(lookup 'service:firebase')
          --store=(lookup 'service:store')
          --message=message}}
    `);

    // Assert
    assert.dom('[data-test-message-list-item="message_a"]').hasText('Message A');
  });

  test('should show media (stickers/gif) message when message has no text', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('message', await this.store.get('message', 'message_b'));

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list/message-list-item
          --firebase=(lookup 'service:firebase')
          --store=(lookup 'service:store')
          --message=message}}
    `);

    // Assert
    assert.dom('[data-test-message-list-item="media"]').exists();
  });

  test('should show message created on when clicking message while it is hidden', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list/message-list-item
          --firebase=(lookup 'service:firebase')
          --store=(lookup 'service:store')
          --message=message}}
    `);

    // Act
    await click('[data-test-message-list-item="message_a"]');

    // Assert
    assert.dom('[data-test-message-list-item="created-on"]').exists();
  });

  test('should hide message created on when clicking message while it is visible', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item/item-author-list/author-list-item/item-message-list/message-list-item
          --firebase=(lookup 'service:firebase')
          --store=(lookup 'service:store')
          --message=message}}
    `);

    await click('[data-test-message-list-item="message_a"]');

    // Act
    await click('[data-test-message-list-item="message_a"]');

    // Assert
    assert.dom('[data-test-message-list-item="created-on"]').doesNotExist();
  });
});
