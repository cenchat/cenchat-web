import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-pack-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('stickerPacks', await this.store.getAll('stickerPack'));
    this.set('selectedStickerPack', this.stickerPacks[0]);
    this.set('onStickerPackClick', () => {});
  });

  test('should show sticker packs', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-pack-list
          --stickerPacks=stickerPacks
          --selectedStickerPack=selectedStickerPack
          --onStickerPackClick=(action onStickerPackClick)}}
    `);

    // Assert
    assert.dom('[data-test-sticker-pack-list="sticker_pack_a"]').exists();
    assert.dom('[data-test-sticker-pack-list="sticker_pack_b"]').exists();
  });

  test('should fire an external action when clicking sticker pack', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onStickerPackClick');

    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-sticker/sticker-pack-list
          --stickerPacks=stickerPacks
          --selectedStickerPack=selectedStickerPack
          --onStickerPackClick=(action onStickerPackClick)}}
    `);

    // Act
    await click('[data-test-sticker-pack-list="sticker_pack_b"]');

    // Assert
    assert.ok(spy.calledWith(this.stickerPacks[1]));
  });
});
