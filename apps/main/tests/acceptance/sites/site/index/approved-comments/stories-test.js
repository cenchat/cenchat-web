import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/index/approved-comments', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list approved comments', async (assert) => {
    assert.expect(4);

    // Act
    await visit('/sites/site_a/approved-comments');

    // Assert
    assert.dom('[data-test-comment-collection-item="comment_b"]').exists();
    assert.dom('[data-test-comment-collection-item="comment_c"]').exists();
    assert.dom('[data-test-comment-collection-item="comment_d"]').exists();
    assert.dom('[data-test-comment-collection-item="comment_e"]').exists();
  });

  test('should reject comment', async function (assert) {
    assert.expect(2);

    // Arrange
    await visit('/sites/site_a/approved-comments');

    // Act
    await click('[data-test-comment-collection-item="reject-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Comment rejected');

    const commentDocSnapshot = await this.db.collection('comments').doc('comment_e').get();

    assert.equal(commentDocSnapshot.get('status'), 'rejected');
  });
});
