import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/manage/roles/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.store.findRecord('user', 'user_b');

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

  test('should show <MainContentForm />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-form');

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content
          --roleChange=roleChange
          --usersWithRole=usersWithRole
          --usersWithoutRole=usersWithoutRole
          --areThereAnyRoleChanges=areThereAnyRoleChanges
          --onSearchUserInput=(action onSearchUserInput)
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { onSearchUserInput: 'function' });
  });

  test('should show <MainContentChangeList /> when there are role changes', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-change-list');

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content
          --roleChange=roleChange
          --usersWithRole=usersWithRole
          --usersWithoutRole=usersWithoutRole
          --areThereAnyRoleChanges=areThereAnyRoleChanges
          --onSearchUserInput=(action onSearchUserInput)
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      roleChange: 'object',
      onRemoveRoleChangeClick: 'function',
    });
  });

  test('should hide <MainContentChangeList /> when there are no role changes', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('areThereAnyRoleChanges', false);
    this.set('roleChange.admin.additions', []);

    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-change-list');

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content
          --roleChange=roleChange
          --usersWithRole=usersWithRole
          --usersWithoutRole=usersWithoutRole
          --areThereAnyRoleChanges=areThereAnyRoleChanges
          --onSearchUserInput=(action onSearchUserInput)
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <MainContentUserList /> for users with role when available', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-user-list');
    const user = await this.store.findRecord('user', 'user_b');

    this.set('usersWithRole', [user]);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content
          --roleChange=roleChange
          --usersWithRole=usersWithRole
          --usersWithoutRole=usersWithoutRole
          --areThereAnyRoleChanges=areThereAnyRoleChanges
          --onSearchUserInput=(action onSearchUserInput)
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
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

  test('should show <MainContentUserList /> for users without role', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-user-list');
    const user = await this.store.findRecord('user', 'user_b');

    this.set('usersWithoutRole', [user]);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content
          --roleChange=roleChange
          --usersWithRole=usersWithRole
          --usersWithoutRole=usersWithoutRole
          --areThereAnyRoleChanges=areThereAnyRoleChanges
          --onSearchUserInput=(action onSearchUserInput)
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
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

  test('should hide <MainContentUserList /> for users with role and users without role when not available', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-user-list');

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content
          --roleChange=roleChange
          --usersWithRole=usersWithRole
          --usersWithoutRole=usersWithoutRole
          --areThereAnyRoleChanges=areThereAnyRoleChanges
          --onSearchUserInput=(action onSearchUserInput)
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
