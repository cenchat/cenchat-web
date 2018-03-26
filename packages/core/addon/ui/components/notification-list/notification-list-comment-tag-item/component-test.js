import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import { getFixtureData, stubService } from '@cenchat/core/test-support';

module('Integration | Component | notification-list/notification-list-comment-tag-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    mockFirebase(this.owner, getFixtureData());
    stubService(this, 'router', { urlFor: sinon.stub() });

    const store = stubService(this, 'store');
    const notification = await run(() => store.findRecord('notification', 'notification_b'));

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
      .hasAttribute('src', 'user_a.jpg');
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
