import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | comments', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should show comment', async (assert) => {
    assert.expect(5);

    // Act
    await visit('/comments/comment_b');

    // Assert
    assert.dom('[data-test-comments-content="message"]').includesText('Foobar');
    assert.dom('[data-test-comments-content="attachment"]').exists({ count: 2 });
    assert.dom('[data-test-comments-content="author-name"]').hasText('User B');
    assert.dom('[data-test-comments-content="page-title"]').hasText('Page A Title');
    assert.dom('[data-test-comments-content="page-title"]').hasAttribute(
      'href',
      'http://site-a.com/foo/bar?cenchat_comment=comment_b',
    );
  });
});
