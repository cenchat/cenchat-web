import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | chat-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const chat = await this.store.get('chat', 'site_c__page_a__user_a');

    this.set('messages', chat.messages);
    this.set('onScrollToTop', () => {});
  });

  test('should show <ChatContentTimeGroupList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-content/chat-content-time-group-list');

    // Act
    await render(hbs`{{chat-content --messages=messages --onScrollToTop=(action onScrollToTop)}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { messages: 'array' });
  });
});
