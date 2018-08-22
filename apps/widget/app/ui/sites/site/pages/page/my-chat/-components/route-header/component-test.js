import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/page/my-chat/-components/route-header', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show account link when current user is authenticated', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/pages/page/my-chat/-components/route-header --session=(lookup 'service:session')}}
    `);

    // Assert
    assert.dom('[data-test-route-header="account-link"]').exists();
  });

  test('should hide account link when current user is unauthenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.isAuthenticated', false);

    // Act
    await render(hbs`
      {{sites/site/pages/page/my-chat/-components/route-header --session=(lookup 'service:session')}}
    `);

    // Assert
    assert.dom('[data-test-route-header="account-link"]').doesNotExist();
  });
});
