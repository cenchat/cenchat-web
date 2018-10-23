import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/site/roles/-components/route-content/user-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const users = await this.store.query('user', {
      fetch: async () => {
        const userQuerySnapshot = await this.db
          .collection('users')
          .orderBy('username')
          .startAt('user_a')
          .endAt('user_\uf8ff')
          .limit(2)
          .get();

        return userQuerySnapshot.docs;
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
    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/user-list/user-list-item');

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content/user-list
        --users=users
        --hasRole=hasRole
        --onAddRoleClick=(action onAddRoleClick)
        --onRemoveRoleClick=(action onRemoveRoleClick)
      }}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      user: 'object',
      hasRole: 'boolean',
      onAddRoleClick: 'function',
      onRemoveRoleClick: 'function',
    });
  });
});
