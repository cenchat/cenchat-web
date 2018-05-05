import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-composer/comment-composer-toolbar/toolbar-sticker-panel', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.store.findRecord('user', 'user_a');
    const stickerPacks = await user.get('stickerPacks');

    this.set('stickerPacks', stickerPacks);
    this.set('onAddAttachmentClick', () => {});
  });

  test('should list sticker packs', async (assert) => {
    assert.expect(2);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-sticker-panel
          --stickerPacks=stickerPacks
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-toolbar-sticker-panel="pack-button__sticker_pack_a"] img')
      .hasAttribute('src', 'sticker_pack_a.jpg');
    assert.dom('[data-test-toolbar-sticker-panel^="pack-button"]').exists({
      count: 2,
    });
  });

  test('should list stickers of selected sticker pack', async (assert) => {
    assert.expect(2);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-sticker-panel
          --stickerPacks=stickerPacks
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"] img')
      .hasAttribute('src', 'sticker_a1.jpg');
    assert.dom('[data-test-toolbar-sticker-panel^="sticker-button"]').exists({
      count: 2,
    });
  });

  test('should change selected sticker pack when clicking another one', async (assert) => {
    assert.expect(3);

    // Arrange
    const pack =
      '[data-test-toolbar-sticker-panel="pack-button__sticker_pack_b"]';

    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-sticker-panel
          --stickerPacks=stickerPacks
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Act
    await click(pack);

    // Assert
    assert.dom(pack).hasAttribute('aria-pressed', 'true');
    assert
      .dom('[data-test-toolbar-sticker-panel="sticker-button__sticker_b1"] img')
      .hasAttribute('src', 'sticker_b1.jpg');
    assert.dom('[data-test-toolbar-sticker-panel^="sticker-button"]').exists({
      count: 2,
    });
  });

  test('should fire an external action when clicking a sticker', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onAddAttachmentClick');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-sticker-panel
          --stickerPacks=stickerPacks
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);
    await click('[data-test-toolbar-sticker-panel="pack-button__sticker_pack_b"]');

    // Act
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_b1"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
