import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import {
  getFixtureData,
  stubPromise,
  stubService,
} from '@cenchat/core/test-support';

module('Integration | Component | notification-list/notification-list-follow-item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    mockFirebase(this.owner, getFixtureData());

    const store = stubService(this, 'store');
    const notification = await run(() => {
      return store.findRecord('notification', 'notification_a');
    });
    const toUser = await run(() => {
      return notification.get('to');
    });

    toUser.set('isFollowing', sinon.stub().returns(stubPromise(true, false)));

    this.set('toUser', toUser);
    this.set('notification', notification);
    this.set('onFollowBackClick', () => {});
  });

  test('should show notification info', async function(assert) {
    assert.expect(4);

    // Act
    await render(hbs`
      {{notification-list/notification-list-follow-item
          --notification=notification
          --onFollowBackClick=(action onFollowBackClick)}}
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

  test('should show follow back button when notification receiver isn\'t following the notification sender', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{notification-list/notification-list-follow-item
          --notification=notification
          --onFollowBackClick=(action onFollowBackClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-notification-list-follow-item="follow-back-button"]')
      .exists();
  });

  test('should hide follow back button when notification receiver is following the notification sender', async function(assert) {
    assert.expect(1);

    // Arrange

    this.set(
      'toUser.isFollowing',
      sinon.stub().returns(stubPromise(true, true)),
    );

    // Act
    await render(hbs`
      {{notification-list/notification-list-follow-item
          --notification=notification
          --onFollowBackClick=(action onFollowBackClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-notification-list-follow-item="follow-back-button"]')
      .doesNotExist();
  });

  test('should fire an external action when clicking follow back', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onFollowBackClick');

    await render(hbs`
      {{notification-list/notification-list-follow-item
          --notification=notification
          --onFollowBackClick=(action onFollowBackClick)}}
    `);

    // Act
    await click('[data-test-notification-list-follow-item="follow-back-button"]');

    // Assert
    assert.ok(spy.calledWith(this.get('notification')));
  });
});
