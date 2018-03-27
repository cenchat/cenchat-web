import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-item/comment-item-content/content quote', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const comment = await run(() => this.get('store').findRecord('comment', 'comment_c'));

    await run(() => comment.get('replyTo'));

    this.set('comment', comment);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show author info', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-quote --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-quote="author-name"]').hasText('User B:');
  });

  test('should show text content', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-quote --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-quote="text"]').hasText('Foobar');
  });

  test('should list stickers content', async (assert) => {
    assert.expect(3);

    // Arrange
    const attachmentImage = '[data-test-content-quote="attachment-image"]';

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-quote --comment=comment}}
    `);

    // Assert
    assert.dom(attachmentImage).exists({ count: 2 });
    assert.dom(attachmentImage).hasAttribute('src', 'sticker_a1.jpg');
    assert.dom(attachmentImage).hasAttribute('alt', 'Laughing sticker');
  });
});
