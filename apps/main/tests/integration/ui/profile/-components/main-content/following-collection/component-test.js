import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | profile/-components/main-content/following-collection', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('followings', await this.get('session.model.followings'));
  });

  test('should show <UserCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`{{profile/-components/main-content/following-collection --followings=followings}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { users: 'instance' });
  });

  test('should show empty state when there are no followings :(', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('followings', []);

    // Act
    await render(hbs`{{profile/-components/main-content/following-collection --followings=followings}}`);

    // Assert
    assert.dom('[data-test-following-collection="empty-state"]').exists();
  });
});
