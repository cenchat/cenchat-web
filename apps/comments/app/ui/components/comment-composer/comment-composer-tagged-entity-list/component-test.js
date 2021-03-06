import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | comment-composer/comment-composer-tagged-user-list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const userA = await this.store.findRecord('user', 'user_a');
    const userB = await this.store.findRecord('user', 'user_b');

    this.set('entities', [userA, userB]);
    this.set('onUntagEntityClick', () => {});
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
