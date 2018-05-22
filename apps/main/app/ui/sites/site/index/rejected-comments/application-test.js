import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/site/index/rejected-comments', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list rejected comments', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a/rejected-comments');

    // Assert
    assert.dom('[data-test-comment-collection-item="comment_f"]').exists();
  });

  test('should approve comment', async function (assert) {
    assert.expect(2);

    // Arrange
    await visit('/sites/site_a/rejected-comments');

    // Act
    await click('[data-test-comment-collection-item="approve-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Comment approved');

    const commentDocSnapshot = await this.db.collection('comments').doc('comment_f').get();

    assert.equal(commentDocSnapshot.get('status'), 'approved');
  });
});
