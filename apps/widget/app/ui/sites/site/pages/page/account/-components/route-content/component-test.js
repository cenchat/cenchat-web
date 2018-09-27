import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/page/account/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show <AccountUpgrade /> when session is anonymous', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/page/account/-components/route-content/account-upgrade');

    this.set('session.content.currentUser.isAnonymous', true);

    // Act
    await render(hbs`
      {{sites/site/pages/page/account/-components/route-content
          --session=(lookup 'service:session')}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show <AccountUpgrade /> when session is not anonymous', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/page/account/-components/route-content/account-upgrade');

    // Act
    await render(hbs`
      {{sites/site/pages/page/account/-components/route-content
          --session=(lookup 'service:session')}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
