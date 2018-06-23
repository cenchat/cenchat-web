import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/manage/roles/-components/main-content/main-content-change-list/change-list-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('user', await this.store.findRecord('user', 'user_b'));
    this.set('description', 'To be added as an admin');
    this.set('onRemoveRoleChangeClick', () => {});
  });

  test('should show user', async function (assert) {
    assert.expect(4);

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-change-list/change-list-item
          --user=user
          --description=description
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Assert
    assert.dom('[data-test-change-list-item="photo"]').hasAttribute('src', 'user_b.jpg');
    assert.dom('[data-test-change-list-item="name"]').hasText('User B');
    assert.dom('[data-test-change-list-item="username"]').hasText('@user_b');
    assert.dom('[data-test-change-list-item="description"]').hasText('To be added as an admin');
  });

  test('should fire an external action when clicking remove role', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onRemoveRoleChangeClick');

    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-change-list/change-list-item
          --user=user
          --description=description
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Act
    await click('[data-test-change-list-item="remove-role-button"]');

    // Assert
    assert.ok(spy.calledWith(this.user));
  });
});
