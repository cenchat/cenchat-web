import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Route | chats/chat', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return chat as model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:chats/chat');

    // Act
    const result = await route.model({ chat_id: 'chat_a' });

    // Assert
    assert.deepEqual(result, await this.store.get('chat', 'chat_a'));
  });

  test('should redirect to chats.chat.messages when transition target is chats.chat.index', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:chats/chat');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect({}, { targetName: 'chats.chat.index' });

    // Assert
    assert.ok(transitionToStub.calledWithExactly('chats.chat.messages'));
  });
});
