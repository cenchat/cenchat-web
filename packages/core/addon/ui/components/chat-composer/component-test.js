import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | chat-composer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
    this.set('isReadOnly', false);
    this.set('onSendMessageClick', () => {});
  });

  test('should show read-only banner when current user is not the chat creator and not a site admin', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model.id', 'user_b');

    // Act
    await render(hbs`
      {{chat-composer
          --session=session
          --chat=chat
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer="read-only-banner"]').exists();
  });

  test('should hide read-only banner when current user is the chat creator', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer
          --session=session
          --chat=chat
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer="read-only-banner"]').doesNotExist();
  });

  test('should hide read-only banner when current user is a site admin', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model.id', 'user_b');
    this.set('chat.site.admins', [{ id: 'user_b' }]);

    // Act
    await render(hbs`
      {{chat-composer
          --session=session
          --chat=chat
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer="read-only-banner"]').doesNotExist();
  });

  test('should show <ChatComposerMainToolbar />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-main-toolbar');

    // Act
    await render(hbs`
      {{chat-composer
          --session=session
          --chat=chat
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      isComposingDisabled: 'boolean',
      isSubToolbarVisible: 'boolean',
      onShowSubToolbarClick: 'function',
      onHideSubToolbarClick: 'function',
      onSendMessageClick: 'function',
    });
  });

  test('should show <ChatComposerSubToolbar /> when clicking show sub toolbar button', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar');

    await render(hbs`
      {{chat-composer
          --session=session
          --chat=chat
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Act
    await click('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, { onGifClick: 'function', onStickerClick: 'function' });
  });

  test('should hide <ChatComposerSubToolbar /> when sending a message', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chat-composer
          --session=session
          --chat=chat
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    await click('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]');

    // Act
    await fillIn('[data-test-chat-composer-main-toolbar="field"]', 'Foo');
    await click('[data-test-chat-composer-main-toolbar="send-button"]');

    // Assert
    assert.dom('[data-test-chat-composer-sub-toolbar="host"]').doesNotExist();
  });
});
