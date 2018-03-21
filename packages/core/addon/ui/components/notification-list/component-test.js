import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import {
  getFixtureData,
  spyComponent,
  stubService,
  stubSession,
} from '@cenchat/core/test-support';

module('Integration | Component | notifications-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    mockFirebase(this.owner, getFixtureData());
    stubService(this, 'router', { urlFor: sinon.stub() });

    const store = stubService(this, 'store');
    const user = await run(() => {
      return store.findRecord('user', 'user_a');
    });

    stubSession(this, user);

    const notifications = await run(() => {
      return store.findAll('notification');
    });

    this.set('notifications', notifications);
  });

  test('should show <NotificationListFollowItem /> for every follow type notification', async function(assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'notification-list/notification-list-follow-item');

    // Act
    await render(hbs`{{notification-list --notifications=notifications}}`);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, {
      'notification': 'instance',
      'onFollowBackClick': 'function',
    });
  });

  test('should show empty state when there are no notifications', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('notifications', []);

    // Act
    await render(hbs`{{notification-list --notifications=notifications}}`);

    // Assert
    assert.dom('[data-test-notification-list="empty-state"]').exists();
  });

  test('should hide empty state when there are notifications', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{notification-list --notifications=notifications}}`);

    // Assert
    assert.dom('[data-test-notification-list="empty-state"]').doesNotExist();
  });
});
