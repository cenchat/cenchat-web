import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent, setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | notifications-list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('notifications', await this.store.findAll('notification'));
  });

  test('should show <NotificationListFollowItem /> for every follow type notification', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'notification-list/notification-list-follow-item');

    // Act
    await render(hbs`{{notification-list --notifications=notifications}}`);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, { notification: 'instance' });
  });

  test('should show empty state when there are no notifications', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('notifications', []);

    // Act
    await render(hbs`{{notification-list --notifications=notifications}}`);

    // Assert
    assert.dom('[data-test-notification-list="empty-state"]').exists();
  });

  test('should hide empty state when there are notifications', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{notification-list --notifications=notifications}}`);

    // Assert
    assert.dom('[data-test-notification-list="empty-state"]').doesNotExist();
  });
});
