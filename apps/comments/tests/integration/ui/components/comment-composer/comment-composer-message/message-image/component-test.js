import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-composer/comment-composer-message/message image', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const sticker = await run(() => {
      return this.get('store').findRecord('sticker', 'sticker_a1');
    });

    this.set('attachment', sticker);
    this.set('onRemoveAttachmentClick', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show image attachment', async function(assert) {
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

  test('should fire an external action when clicking remove attachment button', async function(assert) {
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
