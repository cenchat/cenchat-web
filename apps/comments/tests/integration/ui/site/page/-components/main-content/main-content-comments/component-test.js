import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | site/page/-components/main-content/main-content-comments', (hooks) => {
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
    this.set('filterCommentsBy', 'relevance');
    this.set('pageUrl', 'http://foobar.com');
    this.set('onFilterCommentsClick', () => {});
    this.set('onSignInClick', () => {});
  });

  test('should show <CommentsHeader />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'site/page/-components/main-content/main-content-comments/comments-header');

    // Act
    await render(hbs`
      {{site/page/-components/main-content/main-content-comments
          --session=session
          --comments=comments
          --prioritizedComments=prioritizedComments
          --filterCommentsBy=filterCommentsBy
          --pageUrl=pageUrl
          --onFilterCommentsClick=(action onFilterCommentsClick)
          --onSignInClick=(action onSignInClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      filterCommentsBy: 'string',
      onFilterCommentsClick: 'function',
      onSignInClick: 'function',
    });
  });

  test('should show <CommentList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-list');

    // Act
    await render(hbs`
      {{site/page/-components/main-content/main-content-comments
          --session=session
          --comments=comments
          --prioritizedComments=prioritizedComments
          --filterCommentsBy=filterCommentsBy
          --pageUrl=pageUrl
          --onFilterCommentsClick=(action onFilterCommentsClick)
          --onSignInClick=(action onSignInClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comments: 'instance',
      prioritizedComments: 'array',
      emptyStateMessage: 'string',
      threadLevel: 'number',
      onLoadMoreCommentsClick: 'function',
    });
  });

  test('should fire an external action when rendering while there are no comments filtered by relevance', async function (assert) {
    assert.expect(1);

    // Assert
    const spy = sinon.spy(this, 'onFilterCommentsClick');

    this.set('comments', []);

    // Act
    await render(hbs`
      {{site/page/-components/main-content/main-content-comments
          --session=session
          --comments=comments
          --prioritizedComments=prioritizedComments
          --filterCommentsBy=filterCommentsBy
          --pageUrl=pageUrl
          --onFilterCommentsClick=(action onFilterCommentsClick)
          --onSignInClick=(action onSignInClick)}}
    `);

    // Assert
    assert.ok(spy.calledWith('all'));
  });
});
