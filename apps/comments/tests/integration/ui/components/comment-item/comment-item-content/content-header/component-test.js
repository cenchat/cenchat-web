import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | comment-item/comment-item-content/content-header', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    this.set('comment', comment);
  });

  test('should show author info', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-header --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-header="comment-author"]').hasText('User A');
  });

  test('should show timestamp', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-header --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-header="comment-timestamp"]').exists();
  });
});
