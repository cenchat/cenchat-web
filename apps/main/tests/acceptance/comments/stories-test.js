import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Acceptance | comments', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
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
