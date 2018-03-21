import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-item/comment-item-content/content message', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const comment = await run(() => {
      return this.get('store').findRecord('comment', 'comment_b');
    });

    this.set('comment', comment);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show is deleted message when comment is flagged as deleted', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isDeleted', true);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-message --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-message="deleted-message"]').exists();
  });

  test('should hide is deleted message when comment isn\'t flagged as deleted', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isDeleted', false);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-message --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-message="deleted-message"]').doesNotExist();
  });

  test('should show text content when available', async function(assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-message --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-message="text"]').exists();
    assert.dom('[data-test-content-message="text"]').hasText('Foobar');
  });

  test('should hide text content when unavailable', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.text', null);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-message --comment=comment}}
    `);

    // Assert
    assert.dom('[data-test-content-message="text"]').doesNotExist();
  });

  test('should list stickers attachment', async function(assert) {
    assert.expect(3);

    // Arrange
    const attachmentImage = '[data-test-content-message="attachment-image"]';

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-message --comment=comment}}
    `);

    // Assert
    assert.dom(attachmentImage).exists({ count: 2 });
    assert.dom(attachmentImage).hasAttribute('src', 'sticker_a1.jpg');
    assert.dom(attachmentImage).hasAttribute('alt', 'Laughing sticker');
  });
});
