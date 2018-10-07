import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | chats/chat/-components/route-header', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
  });

  test('should use creator display name as heading when current user is not the creator', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.model.id', 'user_c');

    // Act
    await render(hbs`
      {{chats/chat/-components/route-header
        --session=(lookup "service:session")
        --chat=chat
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="heading"]').hasText('User A');
  });

  test('should use site display name as heading when current user is the creator', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-header
        --session=(lookup "service:session")
        --chat=chat
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="heading"]').hasText('Site C');
  });
});
