import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | sites/site/pages/page/chats/chat/messages', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list messages', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_c/pages/page_a/chats/site_c__page_a__user_a/messages');

    // Assert
    assert.dom('[data-test-message-list="content"]').exists({ count: 3 });
  });
});
