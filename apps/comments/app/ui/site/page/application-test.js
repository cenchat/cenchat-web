import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | site/page', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should create page when it does not exist', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a/pages/page_c?slug=foobardee');

    // Assert
    assert.dom('[data-test-comment-list="empty-state"]').exists();
  });

  test('should show a comment on demand', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a/pages/page_a?comment=comment_c&slug=foobar');

    // Assert
    assert.dom('[data-test-comment-item]').exists({ count: 3 });
  });
});
