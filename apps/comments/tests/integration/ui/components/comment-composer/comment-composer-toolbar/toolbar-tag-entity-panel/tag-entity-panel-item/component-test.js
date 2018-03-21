import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel/tag entity panel item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_b');
    });

    this.set('entity', user);
    this.set('onTagEntityClick', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show entity', async function(assert) {
    assert.expect(3);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-toolbar/toolbar-tag-entity-panel/tag-entity-panel-item
          --entity=entity
          --onTagEntityClick=(action onTagEntityClick)}}
    `);

    // Assert
    assert.dom('[data-test-tag-entity-panel-item="photo"]').hasAttribute(
      'src',
      'user_b.jpg',
    );
    assert.dom('[data-test-tag-entity-panel-item="name"]').hasText('User B');
    assert.dom('[data-test-tag-entity-panel-item="username"]').hasText('@user_b');
  });

  test('should fire an external action when clicking user', async function(assert) {
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
    assert.ok(spy.calledWith(this.get('entity')));
  });
});
