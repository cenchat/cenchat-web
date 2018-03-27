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

module('Integration | Component | comment-composer/comment-composer-tagged-entity-list/tagged entity list item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const user = await run(() => this.get('store').findRecord('user', 'user_a'));

    this.set('entity', user);
    this.set('onUntagEntityClick', () => {});
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show user photo', async (assert) => {
    assert.expect(3);

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-tagged-entity-list/tagged-entity-list-item 
          --entity=entity
          --onUntagEntityClick=(action onUntagEntityClick)}}
    `);

    // Assert
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute(
      'src',
      'user_a.jpg',
    );
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute(
      'title',
      'User A',
    );
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute(
      'alt',
      'User A',
    );
  });

  test('should fire an external action when clicking untag', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onUntagEntityClick');

    await render(hbs`
      {{comment-composer/comment-composer-tagged-entity-list/tagged-entity-list-item 
          --entity=entity
          --onUntagEntityClick=(action onUntagEntityClick)}}
    `);

    // Act
    await click('[data-test-tagged-entity-list-item="untag-button"]');

    // Assert
    assert.ok(spy.calledWith(this.get('entity')));
  });
});
