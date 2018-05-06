import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-composer/comment-composer-toolbar/toolbar-gif-panel/gif-panel-tenor-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('gif', {
      media: [{
        tinygif: { url: 'http://example.com/image.gif' },
      }],
      title: 'wow',
      id: 12345,
    });
    this.set('onAddAttachmentClick', () => {});
  });

  test('should show gif', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-gif-panel/gif-panel-tenor-item
          --gif=gif
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Assert
    assert.dom('[data-test-gif-panel-tenor-item="image"]').hasAttribute(
      'src',
      'http://example.com/image.gif',
    );
    assert.dom('[data-test-gif-panel-tenor-item="image"]').hasAttribute('alt', 'wow');
  });

  test('should fire an external action when clicking gif', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onAddAttachmentClick');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-gif-panel/gif-panel-tenor-item
          --gif=gif
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Act
    await click('[data-test-gif-panel-tenor-item="12345"]');

    // Assert
    assert.ok(spy.calledWith({
      id: 12345,
      description: 'wow',
      imageUrl: 'http://example.com/image.gif',
      type: 'tenor_gif',
    }));
  });
});
