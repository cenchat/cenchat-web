import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('user', await this.store.findRecord('user', 'user_b'));
    this.set('hasRole', true);
    this.set('onAddRoleClick', () => {});
    this.set('onRemoveRoleClick', () => {});
  });

  test('should show user', async (assert) => {
    assert.expect(3);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item
          --user=user
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Assert
    assert.dom('[data-test-user-list-item="photo"]').hasAttribute('src', 'user_b.jpg');
    assert.dom('[data-test-user-list-item="name"]').hasText('User B');
    assert.dom('[data-test-user-list-item="username"]').hasText('@user_b');
  });

  test('should show remove role button when user has a role', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item
          --user=user
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Assert
    assert.dom('[data-test-user-list-item="remove-role-button"]').exists();
  });

  test('should hide remove role button when user does not have a role', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('hasRole', false);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item
          --user=user
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Assert
    assert.dom('[data-test-user-list-item="remove-role-button"]').doesNotExist();
  });

  test('should fire an external action when clicking remove role', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onRemoveRoleClick');

    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item
          --user=user
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Act
    await click('[data-test-user-list-item="remove-role-button"]');

    // Assert
    assert.ok(spy.calledWith(this.get('user')));
  });

  test('should show add role button when user does not have a role', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('hasRole', false);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item
          --user=user
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Assert
    assert.dom('[data-test-user-list-item="add-role-button"]').exists();
  });

  test('should hide add role button when user has a role', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item
          --user=user
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Assert
    assert.dom('[data-test-user-list-item="add-role-button"]').doesNotExist();
  });

  test('should fire an external action when clicking add role', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onAddRoleClick');

    this.set('hasRole', false);

    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-user-list/user-list-item
          --user=user
          --hasRole=hasRole
          --onAddRoleClick=(action onAddRoleClick)
          --onRemoveRoleClick=(action onRemoveRoleClick)}}
    `);

    // Act
    await click('[data-test-user-list-item="add-role-button"]');

    // Assert
    assert.ok(spy.calledWith(this.get('user')));
  });
});
