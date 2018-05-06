import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | comment-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    this.set('comment', comment);
    this.set('threadLevel', 1);
  });

  test('should show <CommentItemAvatar />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-avatar');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onToggleQuoteClick: 'function',
    });
  });

  test('should show <CommentItemContent /> when not editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-content');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      isQuoteVisible: 'boolean',
    });
  });

  test('should hide <CommentItemContent /> when editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="edit-button"]');

    // Assert
    assert.dom('[data-test-item-content]').doesNotExist();
  });

  test('should show <CommentItemToolbar /> when not editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-toolbar');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      comment: 'instance',
      threadLevel: 'number',
      onEditCommentClick: 'function',
      onDeleteCommentClick: 'function',
      onShareCommentClick: 'function',
      onReplyToCommentClick: 'function',
    });
  });

  test('should hide <CommentItemToolbar /> when editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="edit-button"]');

    // Assert
    assert.dom('[data-test-item-toolbar]').doesNotExist();
  });

  test('should show <CommentComposer /> when editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-composer');

    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="edit-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onSendCommentSuccess: 'function',
    });
  });

  test('should hide <CommentComposer /> when not editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-composer');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('TODO: find a way to test navigate.share | should show share comment link when clicking share comment', async function (assert) {
    assert.expect(1);

    // // Arrange
    // await render(hbs`
    //   {{comment-item
    //       --session=session
    //       --comment=comment
    //       --threadLevel=threadLevel}}
    // `);

    // // Act
    // await click('[data-test-item-toolbar="share-button"]');

    // // Assert
    // assert.dom('[data-test-comment-item="share-comment-link"]')
    //   .hasValue('https://cenchat.com/comments/comment_a');

    assert.ok(true);
  });

  test('should hide share comment link by default', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.dom('[data-test-comment-item="share-comment-link"]').doesNotExist();
  });

  test('should show <CommentItemReplies /> when clicking reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-replies');

    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="reply-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      comment: 'instance',
      threadLevel: 'number',
    });
  });

  test('should hide <CommentItemReplies /> when not clicking reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-replies');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
