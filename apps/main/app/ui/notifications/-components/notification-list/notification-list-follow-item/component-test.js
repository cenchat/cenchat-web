import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';

module('Integration | Component | notifications/-components/notification-list/notification-list-follow-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

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
      {{notifications/-components/notification-list/notification-list-follow-item --notification=notification}}
    `);

    // Assert
    assert
      .dom('[data-test-notification-list-follow-item="from-photo"]')
      .hasAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
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
      {{notifications/-components/notification-list/notification-list-follow-item --notification=notification}}
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
      {{notifications/-components/notification-list/notification-list-follow-item --notification=notification}}
    `);

    // Assert
    assert.dom('[data-test-follow-user-button="host"]').doesNotExist();
  });
});
