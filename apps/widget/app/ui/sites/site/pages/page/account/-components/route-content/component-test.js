import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/site/pages/page/account/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('page', await this.store.get('page', 'site_a__page_a'));
  });

  test('should show <AccountUpgrade /> when session is anonymous', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/page/account/-components/route-content/account-upgrade');

    this.set('session.content.currentUser.isAnonymous', true);

    // Act
    await render(hbs`
      {{sites/site/pages/page/account/-components/route-content
        --session=(lookup 'service:session')
        --page=page
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { page: 'object' });
  });

  test('should hide <AccountUpgrade /> when session is not anonymous', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/page/account/-components/route-content/account-upgrade');

    // Act
    await render(hbs`
      {{sites/site/pages/page/account/-components/route-content
        --session=(lookup 'service:session')
        --page=page
      }}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
