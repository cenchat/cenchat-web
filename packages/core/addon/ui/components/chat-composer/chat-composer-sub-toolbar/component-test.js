import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | chat-composer/chat-composer-sub-toolbar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onStickerClick', () => {});
    this.set('onGifClick', () => {});
  });

  test('should show <SubToolbarSticker /> when clicking sticker', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker');

    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Act
    await click('[data-test-chat-composer-sub-toolbar="sticker-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      firebase: 'instance',
      session: 'instance',
      store: 'object',
      onStickerClick: 'function',
    });
  });

  test('should hide <SubToolbarSticker /> by default', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker');

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should mark sticker as selected when clicking it', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Act
    await click('[data-test-chat-composer-sub-toolbar="sticker-button"]');

    // Assert
    assert.dom('[data-test-chat-composer-sub-toolbar="sticker-button"]').hasAttribute('aria-pressed', 'true');
  });

  test('should mark sticker as not selected by default', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-sub-toolbar="sticker-button"]').hasAttribute(
      'aria-pressed',
      'false',
    );
  });

  test('should show <SubToolbarGif /> when clicking gif', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif');

    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Act
    await click('[data-test-chat-composer-sub-toolbar="gif-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, { session: 'instance', onGifClick: 'function' });
  });

  test('should hide <SubToolbarGif /> by default', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif');

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should mark gif as selected when clicking it', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Act
    await click('[data-test-chat-composer-sub-toolbar="gif-button"]');

    // Assert
    assert.dom('[data-test-chat-composer-sub-toolbar="gif-button"]').hasAttribute('aria-pressed', 'true');
  });

  test('should mark gif as not selected by default', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar
          --onStickerClick=(action onStickerClick)
          --onGifClick=(action onGifClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-sub-toolbar="gif-button"]').hasAttribute(
      'aria-pressed',
      'false',
    );
  });
});
