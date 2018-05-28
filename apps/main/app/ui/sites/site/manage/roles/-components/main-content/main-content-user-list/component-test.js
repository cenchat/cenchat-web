import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/manage/roles/-components/main-content/main-content-user-list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const users = await this.store.query('user', {
      limit: 2,
      filter(reference) {
        return reference.orderBy('username').startAt('user_').endAt('user_\uf8ff');
      },
    });

    this.set('users', users);
    this.set('hasRole', true);
    this.set('onAddRoleClick', () => {});
    this.set('onRemoveRoleClick', () => {});
  });

  test('should show <UserListItem /> for every user', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item');

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list
          --users=users
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      user: 'instance',
      hasRole: 'boolean',
      onAddRoleClick: 'function',
      onRemoveRoleClick: 'function',
    });
  });
});
