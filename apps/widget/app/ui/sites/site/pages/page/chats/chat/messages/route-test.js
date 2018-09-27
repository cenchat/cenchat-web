import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/pages/page/chats/chat/messages', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return chat messages as model', async function (assert) {
    assert.expect(3);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/chats/chat/messages');

    sinon.stub(route, 'modelFor').withArgs('sites.site.pages.page.chats.chat').returns({
      id: 'site_c__page_a__user_a',
    });

    // Act
    const result = await route.model({ messageLimit: 12 });

    // Assert
    assert.equal(result[0].id, 'message_c');
    assert.equal(result[1].id, 'message_a');
    assert.equal(result[2].id, 'message_b');
  });
});
