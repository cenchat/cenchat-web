import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | comment-composer/comment-composer-message/message textbox', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('onTextBoxInput', () => {});
  });

  test('should resize textarea when the text overflows', async function(assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-composer/comment-composer-message/message-textbox
          --onTextBoxInput=(action onTextBoxInput)}}
    `);

    const originalHeight = this.element
      .querySelector('[data-test-message-textbox]')
      .clientHeight;

    // Act
    await fillIn('[data-test-message-textbox="field"]', 'Foo\n\n\n\n\n\n\n');

    // Assert
    assert.notEqual(
      originalHeight,
      this.element
        .querySelector('[data-test-message-textbox="field"]')
        .clientHeight,
    );
  });

  test('should fire an external action when inputting in the field', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onTextBoxInput');

    await render(hbs`
      {{comment-composer/comment-composer-message/message-textbox
          --onTextBoxInput=(action onTextBoxInput)}}
    `);

    // Act
    await fillIn('[data-test-message-textbox="field"]', 'Foo');

    // Assert
    assert.ok(spy.calledWith('Foo'));
  });
});
