import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/site/roles/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.store.get('user', 'user_b');

    this.set('roleChange', {
      admin: {
        additions: [user],
        removals: [],
      },
    });
    this.set('usersWithRole', []);
    this.set('usersWithoutRole', []);
    this.set('areThereAnyRoleChanges', true);
    this.set('onSearchUserInput', () => {});
    this.set('onAddRoleClick', () => {});
    this.set('onRemoveRoleClick', () => {});
    this.set('onRemoveRoleChangeClick', () => {});
  });

  test('should show <SearchForm />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/search-form');

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content
        --roleChange=roleChange
        --usersWithRole=usersWithRole
        --usersWithoutRole=usersWithoutRole
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSearchUserInput=(action onSearchUserInput)
        --onAddRoleClick=(action onAddRoleClick)
        --onRemoveRoleClick=(action onRemoveRoleClick)
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { onSearchUserInput: 'function' });
  });

  test('should show <ChangeList /> when there are role changes', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/change-list');

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content
        --roleChange=roleChange
        --usersWithRole=usersWithRole
        --usersWithoutRole=usersWithoutRole
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSearchUserInput=(action onSearchUserInput)
        --onAddRoleClick=(action onAddRoleClick)
        --onRemoveRoleClick=(action onRemoveRoleClick)
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      roleChange: 'object',
      onRemoveRoleChangeClick: 'function',
    });
  });

  test('should hide <ChangeList /> when there are no role changes', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('areThereAnyRoleChanges', false);
    this.set('roleChange.admin.additions', []);

    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/change-list');

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content
        --roleChange=roleChange
        --usersWithRole=usersWithRole
        --usersWithoutRole=usersWithoutRole
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSearchUserInput=(action onSearchUserInput)
        --onAddRoleClick=(action onAddRoleClick)
        --onRemoveRoleClick=(action onRemoveRoleClick)
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <UserList /> for users with role when available', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/user-list');
    const user = await this.store.get('user', 'user_b');

    this.set('usersWithRole', [user]);

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content
        --roleChange=roleChange
        --usersWithRole=usersWithRole
        --usersWithoutRole=usersWithoutRole
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSearchUserInput=(action onSearchUserInput)
        --onAddRoleClick=(action onAddRoleClick)
        --onRemoveRoleClick=(action onRemoveRoleClick)
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, {
      users: 'array',
      hasRole: 'boolean',
      onAddRoleClick: 'function',
      onRemoveRoleClick: 'function',
    });
  });

  test('should show <UserList /> for users without role', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/user-list');
    const user = await this.store.get('user', 'user_b');

    this.set('usersWithoutRole', [user]);

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content
        --roleChange=roleChange
        --usersWithRole=usersWithRole
        --usersWithoutRole=usersWithoutRole
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSearchUserInput=(action onSearchUserInput)
        --onAddRoleClick=(action onAddRoleClick)
        --onRemoveRoleClick=(action onRemoveRoleClick)
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, {
      users: 'array',
      hasRole: 'boolean',
      onAddRoleClick: 'function',
      onRemoveRoleClick: 'function',
    });
  });

  test('should hide <UserList /> for users with role and users without role when not available', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/user-list');

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content
        --roleChange=roleChange
        --usersWithRole=usersWithRole
        --usersWithoutRole=usersWithoutRole
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSearchUserInput=(action onSearchUserInput)
        --onAddRoleClick=(action onAddRoleClick)
        --onRemoveRoleClick=(action onRemoveRoleClick)
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
