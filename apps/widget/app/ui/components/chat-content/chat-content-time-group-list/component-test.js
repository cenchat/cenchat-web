import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | chat-content/chat-content-time-group-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const chat = await this.store.get('chat', 'site_c__page_a__user_a');

    this.set('messages', chat.messages);
  });

  test('should show <TimeGroupListItem /> per every group', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'chat-content/chat-content-time-group-list/time-group-list-item');

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list --messages=messages}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, { group: 'object' });
  });

  test('should messages grouped by author', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list --messages=messages}}
    `);

    // Assert
    assert.dom('[data-test-author-list-item="user_a"] [data-test-message-list-item="message_a"]').exists();
    assert.dom('[data-test-author-list-item="user_a"] [data-test-message-list-item="message_b"]').exists();
    assert.dom('[data-test-author-list-item="user_c"] [data-test-message-list-item="message_c"]').exists();
  });
});
