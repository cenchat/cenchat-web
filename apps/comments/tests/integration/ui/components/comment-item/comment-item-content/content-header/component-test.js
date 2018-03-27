import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-item/comment-item-content/content header', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const comment = await run(() => this.get('store').findRecord('comment', 'comment_a'));

    this.set('comment', comment);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
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
