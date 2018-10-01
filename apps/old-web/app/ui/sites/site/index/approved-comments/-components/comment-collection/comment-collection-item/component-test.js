import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/index/approved-comments/-components/comment-collection/comment-collection-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const site = await this.store.findRecord('site', 'site_a');
    const comments = await site.get('approvedComments');
    const comment = comments.get('firstObject');

    // Pre-load comment author to avoid run-loop errors
    await comment.get('author');

    this.set('comment', comment);
    this.set('onRejectCommentClick', () => {});
  });

  test('should show comment', async function (assert) {
    assert.expect(3);

    // Arrange
    const author = this.comment.get('author');

    // Act
    await render(hbs`
      {{sites/site/index/approved-comments/-components/comment-collection/comment-collection-item
          --comment=comment
          --onRejectCommentClick=(action onRejectCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-comment-collection-item="author-name"]').hasText(author.get('displayName'));
    assert.dom('[data-test-comment-collection-item="created-on"]').exists();
    assert.dom('[data-test-comment-collection-item="text"]').hasText(this.comment.text);
  });

  test('should fire an external action when clicking reject', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onRejectCommentClick');

    await render(hbs`
      {{sites/site/index/approved-comments/-components/comment-collection/comment-collection-item
          --comment=comment
          --onRejectCommentClick=(action onRejectCommentClick)}}
    `);

    // Act
    await click('[data-test-comment-collection-item="reject-button"]');

    // Assert
    assert.ok(spy.calledWith(this.comment));
  });
});
