import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | profile/follow-suggestions/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const userB = await this.store.findRecord('user', 'user_b');

    this.set('followSuggestions', [userB]);
  });

  test('should show <InfiniteContent />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'infinite-content');

    // Act
    await render(hbs`
      {{profile/follow-suggestions/-components/main-content --followSuggestions=followSuggestions}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      query: 'array',
      selector: 'string',
      onLoadMoreRecords: 'function',
    });
  });

  test('should show <UserCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`
      {{profile/follow-suggestions/-components/main-content --followSuggestions=followSuggestions}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { users: 'array' });
  });
});
