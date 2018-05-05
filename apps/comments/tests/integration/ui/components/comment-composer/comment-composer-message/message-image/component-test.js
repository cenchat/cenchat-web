import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-composer/comment-composer-message/message-image', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const sticker = await this.store.findRecord('sticker', 'sticker_a1');

    this.set('attachment', sticker);
    this.set('onRemoveAttachmentClick', () => {});
  });

  test('should show image attachment', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-message/message-image
          --attachment=attachment
          --onRemoveAttachmentClick=(action onRemoveAttachmentClick)}}
    `);

    // Assert
    assert.dom('[data-test-message-image="attachment-image"]').hasAttribute(
      'src',
      'sticker_a1.jpg',
    );
  });

  test('should fire an external action when clicking remove attachment button', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onRemoveAttachmentClick');

    await render(hbs`
      {{comment-composer/comment-composer-message/message-image
          --attachment=attachment
          --onRemoveAttachmentClick=(action onRemoveAttachmentClick)}}
    `);

    // Act
    await click('[data-test-message-image="remove-attachment-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
