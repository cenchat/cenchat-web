import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/manage/roles/-components/main-content/main-content-change-list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('roleChange', {
      admin: {
        additions: [],
        removals: [],
      },
    });
    this.set('onRemoveRoleChangeClick', () => {});
  });

  test('should show <ChangeListItem /> for every admin addition', async function (assert) {
    assert.expect(2);

    // Arrange
    const users = await this.store.query('user', {
      filter(reference) {
        return reference.orderBy('username').startAt('user_').endAt('user_\uf8ff').limit(2);
      },
    });

    this.set('roleChange.admin.additions', users);

    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-change-list/change-list-item');

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-change-list
          --roleChange=roleChange
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      user: 'instance',
      description: 'string',
      onRemoveRoleChangeClick: 'function',
    });
  });

  test('should show <ChangeListItem /> for every admin removal', async function (assert) {
    assert.expect(2);

    // Arrange
    const users = await this.store.query('user', {
      filter(reference) {
        return reference.orderBy('username').startAt('user_').endAt('user_\uf8ff').limit(2);
      },
    });

    this.set('roleChange.admin.removals', users);

    const spy = spyComponent(this, 'sites/site/manage/roles/-components/main-content/main-content-change-list/change-list-item');

    // Act
    await render(hbs`
      {{sites/site/manage/roles/-components/main-content/main-content-change-list
          --roleChange=roleChange
          --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      user: 'instance',
      description: 'string',
      onRemoveRoleChangeClick: 'function',
    });
  });
});
