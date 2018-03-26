import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-composer/comment composer tagged user list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const userA = await run(() => this.get('store').findRecord('user', 'user_a'));
    const userB = await run(() => this.get('store').findRecord('user', 'user_b'));

    this.set('entities', [userA, userB]);
    this.set('onUntagEntityClick', () => {});
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <TaggedEntityListItem /> for every tagged entity', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'comment-composer/comment-composer-tagged-entity-list/tagged-entity-list-item');

    // Act
    await render(hbs`
      {{comment-composer/comment-composer-tagged-entity-list
          --entities=entities
          --onUntagEntityClick=(action onUntagEntityClick)}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      entity: 'instance',
      onUntagEntityClick: 'function',
    });
  });
});
