import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';
import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-composer/comment composer toolbar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const comment = await run(() => this.get('store').findRecord('comment', 'comment_a'));

    this.set('comment', comment);
    this.set('onAddAttachmentClick', () => {});
    this.set('onAskMeAnythingClick', () => {});
    this.set('onSendCommentClick', () => {});
    this.set('onTagEntityClick', () => {});
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
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

  test('should show ask me anything button when allowed for the comment', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isAskMeAnythingAllowed', true);

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

  test('should hide ask me anything button when not allowed for the comment', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isAskMeAnythingAllowed', false);

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

  test('should fire an external action when clicking ask me anything', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onAskMeAnythingClick');

    this.set('comment.isAskMeAnythingAllowed', true);

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
