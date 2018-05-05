import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-item/comment-item-toolbar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    this.set('comment', comment);
    this.set('threadLevel', 1);
    this.set('onEditCommentClick', () => {});
    this.set('onDeleteCommentClick', () => {});
    this.set('onShareCommentClick', () => {});
    this.set('onReplyToCommentClick', () => {});
  });

  test('should show delete button when signed in user is the author and comment isn\'t flagged as deleted', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="delete-button"]').exists();
  });

  test('should hide delete button when signed in user isn\'t the author', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', { id: 'foo' });

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="delete-button"]').doesNotExist();
  });

  test('should hide delete button when comment is flagged as deleted', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isDeleted', true);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="delete-button"]').doesNotExist();
  });

  test('should fire an external action when clicking delete', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onDeleteCommentClick');

    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Act
    await click('[data-test-item-toolbar="delete-button"]');

    // Assert
    assert.ok(spy.calledWith(this.get('comment')));
  });

  test('should show edit button when signed in user is the author and comment isn\'t flagged as deleted', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="edit-button"]').exists();
  });

  test('should hide edit button when signed in user isn\'t the author', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', { id: 'foo' });

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="edit-button"]').doesNotExist();
  });

  test('should hide edit button when comment is flagged as deleted', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isDeleted', true);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="edit-button"]').doesNotExist();
  });

  test('should fire an external action when clicking edit', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onEditCommentClick');

    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Act
    await click('[data-test-item-toolbar="edit-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should fire an external action when clicking share', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onShareCommentClick');

    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Act
    await click('[data-test-item-toolbar="share-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show reply button when thread level < 2', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="reply-button"]').exists();
  });

  test('should show reply button when thread level = 2 and signed in', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('threadLevel', 2);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="reply-button"]').exists();
  });

  test('should hide reply button when thread level = 2 and signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('threadLevel', 2);
    this.set('session.model', null);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="reply-button"]').doesNotExist();
  });

  test('should hide reply button when thread level >= 3', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('threadLevel', 3);

    // Act
    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-toolbar="reply-button"]').doesNotExist();
  });

  test('should fire an external action when clicking reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onReplyToCommentClick');

    await render(hbs`
      {{comment-item/comment-item-toolbar
          --session=session
          --comment=comment
          --threadLevel=threadLevel
          --onEditCommentClick=(action onEditCommentClick)
          --onDeleteCommentClick=(action onDeleteCommentClick)
          --onShareCommentClick=(action onShareCommentClick)
          --onReplyToCommentClick=(action onReplyToCommentClick)}}
    `);

    // Act
    await click('[data-test-item-toolbar="reply-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
