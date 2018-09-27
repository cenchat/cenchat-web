import { fillIn, render, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'GET',
      'https://api.tenor.com/v1/search?key=OZ2DM5UOGY8A&q=wow&safesearch=moderate&media_filter=minimal&limit=8&anon_id=user_a',
      [
        200,
        { 'Content-Type': 'application/json' },
        `{
          "results": [
            {
              "media": [
                {
                  "tinygif": { "url": "http://example.com/image.gif" }
                }
              ],
              "title": "wow",
              "id": 12345
            }
          ]
        }`,
      ],
    );

    this.set('server', server);
    this.set('onGifClick', () => {});
  });

  hooks.afterEach(function () {
    this.server.restore();
  });

  test('should show <GifSearchField />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-search-field');

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif
          --session=(lookup 'service:session')
          --onGifClick=(action onGifClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { onSearchGifInput: 'function' });
  });

  test('should show <GifList /> when searching for gif', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-list');

    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif
          --session=(lookup 'service:session')
          --onGifClick=(action onGifClick)}}
    `);

    // Act
    await fillIn('[data-test-gif-search-field="field"] input', 'wow');

    // Assert
    await settled();
    assert.deepEqual(spy.componentArgsType, { gifs: 'array', onGifClick: 'function' });
  });

  test('should hide <GifList /> when not searching for gif', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif/gif-list');

    // Act
    await render(hbs`
      {{chat-composer/chat-composer-sub-toolbar/sub-toolbar-gif
          --session=(lookup 'service:session')
          --onGifClick=(action onGifClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
