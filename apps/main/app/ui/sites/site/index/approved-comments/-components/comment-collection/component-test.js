import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/index/approved-comments/-components/comment-collection', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const site = await this.store.findRecord('site', 'site_a');

    this.set('comments', await site.get('approvedComments'));
    this.set('onRejectCommentClick', () => {});
  });

  test('should show <CommentCollectionItem /> for every comment', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/index/approved-comments/-components/comment-collection/comment-collection-item');

    // Act
    await render(hbs`
      {{sites/site/index/approved-comments/-components/comment-collection
          --comments=comments
          --onRejectCommentClick=(action onRejectCommentClick)}}
    `);

    // Assert
    assert.equal(spy.callCount, 4);
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onRejectCommentClick: 'function',
    });
  });

  test('should show empty state when there are no comments', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comments', []);

    // Act
    await render(hbs`
      {{sites/site/index/approved-comments/-components/comment-collection
          --comments=comments
          --onRejectCommentClick=(action onRejectCommentClick)}}
    `);

    // Assert
    assert.dom('[data-test-comment-collection="empty-state"]').exists();
  });
});
