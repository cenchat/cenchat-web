import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | chats/chat/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
  });

  test('should show page link', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/chat/-components/route-content --chat=chat}}`);

    // Assert
    assert.dom('[data-test-route-content="page-link"]').hasText('Page A Title');
  });

  test('should hide page link when clicking hide page link', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`{{chats/chat/-components/route-content --chat=chat}}`);

    // Act
    await click('[data-test-route-content="hide-page-link-button"]');

    // Assert
    assert.dom('[data-test-route-content="page-link"]').doesNotExist();
  });
});
