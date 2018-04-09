import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestEnv, stubPromise } from '@cenchat/core/test-support';

module('Integration | Component | notification-list/notification-list-follow-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestEnv(this);

    const notification = await this.store.findRecord('notification', 'notification_a');
    const toUser = await notification.get('to');

    toUser.set('isFollowing', sinon.stub().returns(stubPromise(true, false)));

    this.set('toUser', toUser);
    this.set('notification', notification);
  });

  test('should show notification info', async (assert) => {
    assert.expect(4);

    // Act
    await render(hbs`
      {{notification-list/notification-list-follow-item --notification=notification}}
    `);

    // Assert
    assert
      .dom('[data-test-notification-list-follow-item="from-photo"]')
      .hasAttribute('src', 'user_c.jpg');
    assert
      .dom('[data-test-notification-list-follow-item="from-photo"]')
      .hasAttribute('alt', 'User C');
    assert
      .dom('[data-test-notification-list-follow-item="title"]')
      .includesText('User C started following you');
    assert
      .dom('[data-test-notification-list-follow-item="created-on"]')
      .exists();
  });

  test('should show follow back button when notification receiver isn\'t following the notification sender', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{notification-list/notification-list-follow-item --notification=notification}}
    `);

    // Assert
    assert.dom('[data-test-follow-user-button="host"]').exists();
  });

  test('should hide follow back button when notification receiver is following the notification sender', async function (assert) {
    assert.expect(1);

    // Arrange

    this.set(
      'toUser.isFollowing',
      sinon.stub().returns(stubPromise(true, true)),
    );

    // Act
    await render(hbs`
      {{notification-list/notification-list-follow-item --notification=notification}}
    `);

    // Assert
    assert.dom('[data-test-follow-user-button="host"]').doesNotExist();
  });
});
