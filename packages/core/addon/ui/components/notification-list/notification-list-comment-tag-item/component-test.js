import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | notification-list/notification-list-comment-tag-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const notification = await this.store.findRecord('notification', 'notification_b');

    this.set('notification', notification);
  });

  test('should show notification info', async (assert) => {
    assert.expect(5);

    // Act
    await render(hbs`
      {{notification-list/notification-list-comment-tag-item --notification=notification}}
    `);

    // Assert
    assert
      .dom('[data-test-notification-list-comment-tag-item="from-photo"]')
      .hasAttribute('src', 'https://graph.facebook.com/fb_user_a/picture?type=large');
    assert
      .dom('[data-test-notification-list-comment-tag-item="from-photo"]')
      .hasAttribute('alt', 'User A');
    assert
      .dom('[data-test-notification-list-comment-tag-item="title"]')
      .includesText('User A tagged you in a comment');
    assert
      .dom('[data-test-notification-list-comment-tag-item="created-on"]')
      .exists();
    assert
      .dom('[data-test-notification-list-comment-tag-item="visit-link"]')
      .exists();
  });
});
