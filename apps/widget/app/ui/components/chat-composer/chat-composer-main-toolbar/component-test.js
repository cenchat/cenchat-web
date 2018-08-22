import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | chat-composer/chat-composer-main-toolbar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('isComposingDisabled', false);
    this.set('isSubToolbarVisible', false);
    this.set('onShowSubToolbarClick', () => {});
    this.set('onHideSubToolbarClick', () => {});
    this.set('onSendMessageClick', () => {});
  });

  test('should show show-sub-toolbar button when sub toolbar is not visible', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]').exists();
  });

  test('should hide show-sub-toolbar button when sub toolbar is visible', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isSubToolbarVisible', true);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]').doesNotExist();
  });

  test('should show hide-sub-toolbar button when sub toolbar is visible', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isSubToolbarVisible', true);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="hide-sub-toolbar-button"]').exists();
  });

  test('should hide hide-sub-toolbar button when sub toolbar is not visible', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="hide-sub-toolbar-button"]').doesNotExist();
  });

  test('should enable show-sub-toolbar button when composing is not disabled', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]').isNotDisabled();
  });

  test('should disable show-sub-toolbar button when composing is disabled', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isComposingDisabled', true);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="show-sub-toolbar-button"]').isDisabled();
  });

  test('should enable field when composing is not disabled', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="field"]').isNotDisabled();
  });

  test('should disable field when composing is disabled', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isComposingDisabled', true);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="field"]').isDisabled();
  });

  test('should enable send button when composing is not disabled and text field is not empty', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Act
    await fillIn('[data-test-chat-composer-main-toolbar="field"]', 'Foo');

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="send-button"]').isNotDisabled();
  });

  test('should disable send button when composing is disabled', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isComposingDisabled', true);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="send-button"]').isDisabled();
  });

  test('should disable send button when text field is empty', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="send-button"]').isDisabled();
  });

  test('should fire an external action when clicking send', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSendMessageClick');

    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Act
    await fillIn('[data-test-chat-composer-main-toolbar="field"]', 'Foo');
    await click('[data-test-chat-composer-main-toolbar="send-button"]');

    // Assert
    assert.ok(spy.calledWith('Foo', 'text'));
  });

  test('should reset text field when sending message', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chat-composer/chat-composer-main-toolbar
          --isComposingDisabled=isComposingDisabled
          --isSubToolbarVisible=isSubToolbarVisible
          --onShowSubToolbarClick=(action onShowSubToolbarClick)
          --onHideSubToolbarClick=(action onHideSubToolbarClick)
          --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Act
    await fillIn('[data-test-chat-composer-main-toolbar="field"]', 'Foo');
    await click('[data-test-chat-composer-main-toolbar="send-button"]');

    // Assert
    assert.dom('[data-test-chat-composer-main-toolbar="field"]').hasNoValue();
  });
});
