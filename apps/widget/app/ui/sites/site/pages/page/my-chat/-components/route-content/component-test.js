import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/page/my-chat/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
  });

  test('should show <SignInForm /> when current user is authenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.isAuthenticated', false);

    const spy = spyComponent(this, 'sign-in-form');

    // Act
    await render(hbs`
      {{sites/site/pages/page/my-chat/-components/route-content --session=(lookup 'service:session') --chat=chat}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { page: 'object', isAnonymousAllowed: 'boolean' });
  });

  test('should hide <SignInForm /> when current user is unauthenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sign-in-form');

    // Act
    await render(hbs`
      {{sites/site/pages/page/my-chat/-components/route-content --session=(lookup 'service:session') --chat=chat}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
