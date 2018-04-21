import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | user-collection', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const users = await this.store.query('user', {
      filter(reference) {
        return reference.limit(2);
      },
    });

    this.set('users', users);
  });

  test('should show <UserCollectionItem /> for each user', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'user-collection/user-collection-item');

    // Act
    await render(hbs`{{user-collection --users=users}}`);

    // Assert
    assert.ok(spy.called);
    assert.deepEqual(spy.componentArgsType, { user: 'instance' });
  });
});
