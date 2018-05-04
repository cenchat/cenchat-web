import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | notifications/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.get('session.model');

    this.set('user', user);
  });

  test('should show <NotificationList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'notification-list');

    // Act
    await render(hbs`{{notifications/-components/main-content --user=user}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { notifications: 'instance' });
  });
});
