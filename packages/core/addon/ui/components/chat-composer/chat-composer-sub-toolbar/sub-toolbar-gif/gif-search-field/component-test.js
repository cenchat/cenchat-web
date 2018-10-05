import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-search-field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onSearchGifInput', () => {});
  });

  test('should fire an external action when searching', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSearchGifInput');

    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-search-field
          --onSearchGifInput=(action onSearchGifInput)}}
    `);

    // Act
    await fillIn('[data-test-gif-search-field="field"] input', 'Foo');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
