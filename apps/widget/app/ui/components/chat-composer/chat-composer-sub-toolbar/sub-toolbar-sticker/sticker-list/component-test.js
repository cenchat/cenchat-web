import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';
import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const stickerPack = await this.store.get('stickerPack', 'sticker_pack_a');

    this.set('stickers', stickerPack.stickers);
    this.set('onStickerClick', () => {});
  });

  test('should list stickers', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-list
          --stickers=stickers
          --onStickerClick=(action onStickerClick)}}
    `);

    // Assert
    assert.dom('[data-test-sticker-list="sticker_a1"]').exists();
    assert.dom('[data-test-sticker-list="sticker_a2"]').exists();
  });

  test('should fire an external action when clicking a sticker', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onStickerClick');

    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-list
          --stickers=stickers
          --onStickerClick=(action onStickerClick)}}
    `);

    // Act
    await click('[data-test-sticker-list="sticker_a1"]');

    // Assert
    assert.ok(spy.calledWith(this.stickers[0].id, 'sticker'));
  });
});
