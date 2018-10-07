import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | notifications/-components/notification-list/notification-list-comment-reply-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const notification = await this.store.findRecord('notification', 'notification_c');

    this.set('notification', notification);
  });

  test('should show notification info', async (assert) => {
    assert.expect(5);

    // Act
    await render(hbs`
      {{notifications/-components/notification-list/notification-list-comment-reply-item --notification=notification}}
    `);

    // Assert
    assert
      .dom('[data-test-notification-list-comment-reply-item="from-photo"]')
      .hasAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
    assert
      .dom('[data-test-notification-list-comment-reply-item="from-photo"]')
      .hasAttribute('alt', 'User B');
    assert
      .dom('[data-test-notification-list-comment-reply-item="title"]')
      .includesText('User B replied to your comment');
    assert
      .dom('[data-test-notification-list-comment-reply-item="created-on"]')
      .exists();
    assert
      .dom('[data-test-notification-list-comment-reply-item="visit-link"]')
      .exists();
  });
});
