import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onTagEntityClick', () => {});
  });

  test('should show search result list when there are results from searching', async (assert) => {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await fillIn('[data-test-toolbar-tag-entity-panel="search-field"] input', 'user_');

    // Assert
    assert.dom('[data-test-toolbar-tag-entity-panel="search-result"]').exists();
  });

  test('should hide search result list when there are no results from searching', async (assert) => {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await fillIn('[data-test-toolbar-tag-entity-panel="search-field"] input', ' ');

    // Assert
    assert.dom('[data-test-toolbar-tag-entity-panel="search-result"]').doesNotExist();
  });

  test('should show <TagEntityPanelItem /> for every search result when searching for an entity', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel/tag-entity-panel-item');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await fillIn('[data-test-toolbar-tag-entity-panel="search-field"] input', 'user_');

    // Assert
    assert.ok(spy.called);
    assert.deepEqual(spy.componentArgsType, {
      entity: 'instance',
      onTagEntityClick: 'function',
    });
  });
});
