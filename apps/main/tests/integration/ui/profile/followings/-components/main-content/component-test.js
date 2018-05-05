import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | profile/followings/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const followings = await this.get('session.model.followings');

    this.set('users', followings);
  });

  test('should show <InfiniteContent />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'infinite-content');

    // Act
    await render(hbs`
      {{profile/followings/-components/main-content --users=users}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { query: 'instance', selector: 'string' });
  });

  test('should show <UserCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`
      {{profile/followings/-components/main-content --users=users}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { users: 'instance' });
  });
});
