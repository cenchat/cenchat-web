import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onStickerClick', () => {});
  });

  test('should show <StickerPackList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-pack-list');

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker
          --firebase=(lookup 'service:firebase')
          --session=(lookup 'service:session')
          --store=(lookup 'service:store')
          --onStickerClick=(action onStickerClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      stickerPacks: 'array',
      selectedStickerPack: 'object',
      onStickerPackClick: 'function',
    });
  });

  test('should show <StickerList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-list');

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker
          --firebase=(lookup 'service:firebase')
          --session=(lookup 'service:session')
          --store=(lookup 'service:store')
          --onStickerClick=(action onStickerClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { stickers: 'array', onStickerClick: 'function' });
  });
});
