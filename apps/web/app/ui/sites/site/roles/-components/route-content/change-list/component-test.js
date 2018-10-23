import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/site/roles/-components/route-content/change-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('users', await this.store.query('user', {
      fetch: async () => {
        const userQuerySnapshot = await this.db
          .collection('users')
          .orderBy('username')
          .startAt('user_')
          .endAt('user_\uf8ff')
          .limit(2)
          .get();

        return userQuerySnapshot.docs;
      },
    }));
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
    this.set('roleChange.admin.additions', this.users);

    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/change-list/change-list-item');

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content/change-list
        --roleChange=roleChange
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      user: 'object',
      description: 'string',
      onRemoveRoleChangeClick: 'function',
    });
  });

  test('should show <ChangeListItem /> for every admin removal', async function (assert) {
    assert.expect(2);

    // Arrange
    this.set('roleChange.admin.removals', this.users);

    const spy = spyComponent(this, 'sites/site/roles/-components/route-content/change-list/change-list-item');

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-content/change-list
        --roleChange=roleChange
        --onRemoveRoleChangeClick=(action onRemoveRoleChangeClick)
      }}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      user: 'object',
      description: 'string',
      onRemoveRoleChangeClick: 'function',
    });
  });
});
