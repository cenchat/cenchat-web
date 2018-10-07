import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | profile/settings/-components/route-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onDeleteAccountToastCompletion', () => {});
  });

  test('should show <AccountSettings />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/settings/-components/route-content/account-settings');

    // Act
    await render(hbs`
      {{profile/settings/-components/route-content
        --onDeleteAccountToastCompletion=(action onDeleteAccountToastCompletion)
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { router: 'instance', session: 'instance' });
  });

  test('should show <SecuritySettings />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/settings/-components/route-content/security-settings');

    // Act
    await render(hbs`
      {{profile/settings/-components/route-content
        --onDeleteAccountToastCompletion=(action onDeleteAccountToastCompletion)
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { onDeleteAccountToastCompletion: 'function' });
  });
});
