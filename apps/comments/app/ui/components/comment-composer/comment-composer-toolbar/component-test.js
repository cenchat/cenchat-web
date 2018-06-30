import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-composer/comment-composer-toolbar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    this.set('comment', comment);
    this.set('onAddAttachmentClick', () => {});
    this.set('onAskMeAnythingClick', () => {});
    this.set('onSendCommentClick', () => {});
    this.set('onTagEntityClick', () => {});
  });

  test('should show <ToolbarStickerPanel /> when clicking sticker', async function (assert) {
    assert.expect(2);

    // Arrange
    const stickerButton = '[data-test-composer-toolbar="sticker-button"]';
    const spy = spyComponent(this, 'components/comment-composer/comment-composer-toolbar/toolbar-sticker-panel');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await click(stickerButton);

    // Assert
    assert.dom(stickerButton).hasAttribute('aria-pressed', 'true');
    assert.deepEqual(spy.componentArgsType, {
      stickerPacks: 'instance',
      onAddAttachmentClick: 'function',
    });
  });

  test('should show <ToolbarGifPanel /> when clicking gif', async function (assert) {
    assert.expect(2);

    // Arrange
    const gifButton = '[data-test-composer-toolbar="gif-button"]';
    const spy = spyComponent(this, 'components/comment-composer/comment-composer-toolbar/toolbar-gif-panel');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await click(gifButton);

    // Assert
    assert.dom(gifButton).hasAttribute('aria-pressed', 'true');
    assert.deepEqual(spy.componentArgsType, { onAddAttachmentClick: 'function' });
  });

  test('should show <ToolbarTagEntityPanel /> when clicking tag user', async function (assert) {
    assert.expect(2);

    // Arrange
    const tagEntityButton = '[data-test-comment-composer-toolbar="tag-entity-button"]';
    const spy = spyComponent(this, 'components/comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await click(tagEntityButton);

    // Assert
    assert.dom(tagEntityButton).hasAttribute('aria-pressed', 'true');
    assert.deepEqual(spy.componentArgsType, { onTagEntityClick: 'function' });
  });

  test('should show let me know button when allowed for the comment', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isLetMeKnowAllowed', true);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-comment-composer-toolbar="ask-me-anything-button"]')
      .exists();
  });

  test('should hide let me know button when not allowed for the comment', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isLetMeKnowAllowed', false);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-comment-composer-toolbar="ask-me-anything-button"]')
      .doesNotExist();
  });

  test('should fire an external action when clicking let me know', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onAskMeAnythingClick');

    this.set('comment.isLetMeKnowAllowed', true);

    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await click('[data-test-comment-composer-toolbar="ask-me-anything-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should enable send button when comment is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isMessageValid', true);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-composer-toolbar="send-button"]')
      .doesNotHaveAttribute('disabled');
  });

  test('should disable send button when comment is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isMessageValid', false);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-composer-toolbar="send-button"]')
      .hasAttribute('disabled');
  });

  test('should fire an external action when clicking send', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSendCommentClick');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar
          --comment=comment
          --onAddAttachmentClick=(action onAddAttachmentClick)
          --onAskMeAnythingClick=(action onAskMeAnythingClick)
          --onSendCommentClick=(action onSendCommentClick)
          --onTagEntityClick=(action onTagEntityClick)}}
    `);
    await click('[data-test-composer-toolbar="sticker-button"]');

    // Act
    await click('[data-test-composer-toolbar="send-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
