import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | comment-list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comments = await this.store.query('comment', {
      filter(reference) {
        return reference.limit(2);
      },
    });

    this.set('comments', comments);
    this.set('prioritizedComments', []);
    this.set('emptyStateMessage', 'No comments');
    this.set('threadLevel', 2);
  });

  test('should show <CommentItem /> for every new comment', async function (assert) {
    assert.expect(2);

    // Arrange
    const prioritizedComment = await this.store.findRecord('comment', 'comment_c');

    this.set('prioritizedComments', [prioritizedComment]);

    const spy = spyComponent(this, 'comment-item');

    // Act
    await render(hbs`
      {{comment-list
          --comments=comments
          --prioritizedComments=prioritizedComments
          --emptyStateMessage=emptyStateMessage
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.equal(spy.callCount, 3);
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      threadLevel: 'number',
    });
  });

  test('should show <CommentItem /> for every comment', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'comment-item');

    // Act
    await render(hbs`
      {{comment-list
          --comments=comments
          --prioritizedComments=prioritizedComments
          --emptyStateMessage=emptyStateMessage
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.equal(spy.callCount, 2);
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      threadLevel: 'number',
    });
  });

  test('should show empty state when there are no comments and empty state message is available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('prioritizedComments', []);
    this.set('comments', []);

    // Act
    await render(hbs`
      {{comment-list
          --comments=comments
          --prioritizedComments=prioritizedComments
          --emptyStateMessage=emptyStateMessage
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.dom('[data-test-comment-list="empty-state"]').exists();
  });

  test('should hide empty state when there are no comments and empty state message is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comments', []);
    this.set('emptyStateMessage', null);

    // Act
    await render(hbs`
      {{comment-list
          --comments=comments
          --prioritizedComments=prioritizedComments
          --emptyStateMessage=emptyStateMessage
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.dom('[data-test-comment-list="empty-state"]').doesNotExist();
  });

  test('should show load more comments button when number of comments is >= to the current limit', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-list
          --comments=comments
          --prioritizedComments=prioritizedComments
          --emptyStateMessage=emptyStateMessage
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.dom('[data-test-comment-list="load-more-comments-button"]').exists();
  });

  test('should hide load more comments button when number of comments is < the current limit', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comments', []);

    // Act
    await render(hbs`
      {{comment-list
          --comments=comments
          --prioritizedComments=prioritizedComments
          --emptyStateMessage=emptyStateMessage
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.dom('[data-test-comment-list="load-more-comments-button"]').doesNotExist();
  });
});
