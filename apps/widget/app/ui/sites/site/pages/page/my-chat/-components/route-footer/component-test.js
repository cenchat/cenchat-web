import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/site/pages/page/my-chat/-components/route-footer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
    this.set('onSendMessageClick', () => {});
  });

  test('should show <ChatComposer />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-composer');

    // Act
    await render(hbs`
      {{sites/site/pages/page/my-chat/-components/route-footer --session=(lookup 'service:session') --chat=chat --onSendMessageClick=(action onSendMessageClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      chat: 'object',
      onSendMessageClick: 'function',
    });
  });
});
