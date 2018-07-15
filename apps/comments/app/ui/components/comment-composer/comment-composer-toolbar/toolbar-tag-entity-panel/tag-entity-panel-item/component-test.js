import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel/tag-entity-panel-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.store.findRecord('user', 'user_b');

    this.set('entity', user);
    this.set('onTagEntityClick', () => {});
  });

  test('should show entity', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel/tag-entity-panel-item
          --entity=entity
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Assert
    assert.dom('[data-test-tag-entity-panel-item="photo"]').hasAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
    assert.dom('[data-test-tag-entity-panel-item="name"]').hasText('User B');
    assert.dom('[data-test-tag-entity-panel-item="username"]').hasText('@user_b');
  });

  test('should hide entity username when not available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('entity.displayUsername', null);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel/tag-entity-panel-item
          --entity=entity
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Assert
    assert.dom('[data-test-tag-entity-panel-item="username"]').doesNotExist();
  });

  test('should fire an external action when clicking user', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onTagEntityClick');

    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel/tag-entity-panel-item
          --entity=entity
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Act
    await click('[data-test-tag-entity-panel-item="user_b"] button');

    // Assert
    assert.ok(spy.calledWith(this.entity));
  });
});
