import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('gifs', [
      {
        id: 'gif_a',
        description: 'GIF A',
        height: 120,
        imageUrl: 'gif_a.jpg',
        type: 'tenor_gif',
        width: 120,
      },
      {
        id: 'gif_b',
        description: 'GIF B',
        height: 120,
        imageUrl: 'gif_b.jpg',
        type: 'tenor_gif',
        width: 120,
      },
    ]);
    this.set('onGifClick', () => {});
  });

  test('should list gifs', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-list
          --gifs=gifs
          --onGifClick=(action onGifClick)}}
    `);

    // Assert
    assert.dom('[data-test-gif-list="gif_a"]').exists();
    assert.dom('[data-test-gif-list="gif_b"]').exists();
  });

  test('should fire an external action when clicking gif', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onGifClick');

    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-list
          --gifs=gifs
          --onGifClick=(action onGifClick)}}
    `);

    // Act
    await click('[data-test-gif-list="gif_a"]');

    // Assert
    assert.ok(spy.calledWith(this.gifs[0].id, 'tenor_gif'));
  });
});
