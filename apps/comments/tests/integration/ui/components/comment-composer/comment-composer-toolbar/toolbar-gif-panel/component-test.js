import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-composer/comment-composer-toolbar/toolbar-gif-panel', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

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
    this.set('onAddAttachmentClick', () => {});
  });

  hooks.afterEach(function () {
    this.server.restore();
  });

  test('should show list matching gif when searching', async (assert) => {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-gif-panel
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Act
    await fillIn('[data-test-toolbar-gif-panel="search-field"] input', 'wow');

    // Act
    assert.dom('[data-test-toolbar-gif-panel="search-result"]').exists();
  });

  test('should hide list matching gif when not searching', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-gif-panel
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Act
    assert.dom('[data-test-toolbar-gif-panel="search-result"]').doesNotExist();
  });

  test('should show <GifPanelTenorItem /> for every matching gif when searching', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'comment-composer/comment-composer-toolbar/toolbar-gif-panel/gif-panel-tenor-item');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-gif-panel
          --onAddAttachmentClick=(action onAddAttachmentClick)}}
    `);

    // Act
    await fillIn('[data-test-toolbar-gif-panel="search-field"] input', 'wow');

    // Act
    assert.ok(spy.called);
    assert.deepEqual(spy.componentArgsType, { gif: 'object', onAddAttachmentClick: 'function' });
  });
});
