import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | comment-composer/comment-composer-message', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    this.set('comment', comment);
    this.set('onRemoveAttachmentClick', () => {});
    this.set('onTextBoxInput', () => {});
  });

  test('should show <MessageImage /> for every image attachment', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'comment-composer/comment-composer-message/message-image');

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-message
          --comment=comment
          --onRemoveAttachmentClick=(action onRemoveAttachmentClick)
          --onTextBoxInput=(action onTextBoxInput)}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      attachment: 'instance',
      onRemoveAttachmentClick: 'function',
    });
  });

  test('should show <MessageTextbox /> when text comment is allowed', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isTextAllowed', true);

    const spy = spyComponent(this, 'comment-composer/comment-composer-message/message-textbox');

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-message
          --comment=comment
          --onRemoveAttachmentClick=(action onRemoveAttachmentClick)
          --onTextBoxInput=(action onTextBoxInput)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onTextBoxInput: 'function',
    });
  });

  test('should hide <MessageTextbox /> when text comment is not allowed', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isTextAllowed', false);

    const spy = spyComponent(this, 'comment-composer/comment-composer-message/message-textbox');

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-message
          --comment=comment
          --onRemoveAttachmentClick=(action onRemoveAttachmentClick)
          --onTextBoxInput=(action onTextBoxInput)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
