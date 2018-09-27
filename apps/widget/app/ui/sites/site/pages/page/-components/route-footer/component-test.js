import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/page/-components/route-footer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('page', await this.store.get('page', 'site_a__page_a'));
  });

  test('should show chats link when current user is a site admin', async function (assert) {
    assert.expect(1);

    // Arange
    this.set('page.site.admins', [{ id: 'user_a' }]);

    // Act
    await render(hbs`
      {{sites/site/pages/page/-components/route-footer --session=(lookup 'service:session') --page=page}}
    `);

    // Assert
    assert.dom('[data-test-route-footer="chats-link"]').exists();
  });

  test('should hide chats link when current user is not a site admin', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/-components/route-footer --session=(lookup 'service:session') --page=page}}
    `);

    // Assert
    assert.dom('[data-test-route-footer="chats-link"]').doesNotExist();
  });

  test('should show my-chat link when current user is not a site admin', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/-components/route-footer --session=(lookup 'service:session') --page=page}}
    `);

    // Assert
    assert.dom('[data-test-route-footer="my-chat-link"]').exists();
  });

  test('should hide my-chat link when current user is a site admin', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('page.site.admins', [{ id: 'user_a' }]);

    // Act
    await render(hbs`
      {{sites/site/pages/page/-components/route-footer --session=(lookup 'service:session') --page=page}}
    `);

    // Assert
    assert.dom('[data-test-route-footer="my-chat-link"]').doesNotExist();
  });

  test('should show account link when current user is authenticated', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/-components/route-footer --session=(lookup 'service:session') --page=page}}
    `);

    // Assert
    assert.dom('[data-test-route-footer="account-link"]').exists();
  });

  test('should hide account link when current user is unauthenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.isAuthenticated', false);

    // Act
    await render(hbs`
      {{sites/site/pages/page/-components/route-footer --session=(lookup 'service:session') --page=page}}
    `);

    // Assert
    assert.dom('[data-test-route-footer="account-link"]').doesNotExist();
  });
});
