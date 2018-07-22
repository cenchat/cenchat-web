import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | comment-item/comment-item-content/content-quote', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_c');

    // Preload
    await comment.get('replyTo');

    this.set('comment', comment);
  });

  test('should show author info', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-quote --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-quote="author-name"]').hasText('User B:');
  });

  test('should show text content', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-quote --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-quote="text"]').hasText('Foobar');
  });

  test('should list stickers content', async function (assert) {
    assert.expect(1);

    // Arrange
    const attachmentImage = '[data-test-content-quote="attachment-image"]';

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-quote --comment=comment}}
    `);

    // Assert
    assert.dom(attachmentImage).exists({ count: 2 });
  });
});
