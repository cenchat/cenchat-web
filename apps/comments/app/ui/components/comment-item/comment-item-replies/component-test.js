import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | comment-item/comment-item-replies', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    this.set('comment', comment);
    this.set('threadLevel', 1);
  });

  test('should show <CommentComposer /> when signed in', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-composer');

    // Act
    await render(hbs`
      {{comment-item/comment-item-replies
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      page: 'instance',
      replyTo: 'instance',
      onSendCommentSuccess: 'function',
    });
  });

  test('should hide <CommentComposer /> when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', null);

    const spy = spyComponent(this, 'comment-composer');

    // Act
    await render(hbs`
      {{comment-item/comment-item-replies
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <CommentList /> for old comments when within max thread level threshold', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-list');

    // Act
    await render(hbs`
      {{comment-item/comment-item-replies
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    assert.deepEqual(spy.componentArgsType, {
      comments: 'instance',
      prioritizedComments: 'array',
      threadLevel: 'number',
      onLoadMoreCommentsClick: 'function',
    });
  });

  test('should hide <CommentList /> for old comments when over the thread level threshold', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('threadLevel', 2);

    const spy = spyComponent(this, 'comment-list');

    // Act
    await render(hbs`
      {{comment-item/comment-item-replies
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show <CommentList /> for new comments when over the max thread level threshold', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('threadLevel', 2);

    const spy = spyComponent(this, 'comment-list');

    // Act
    await render(hbs`
      {{comment-item/comment-item-replies
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    assert.deepEqual(spy.componentArgsType, {
      prioritizedComments: 'array',
      threadLevel: 'number',
    });
  });
});
