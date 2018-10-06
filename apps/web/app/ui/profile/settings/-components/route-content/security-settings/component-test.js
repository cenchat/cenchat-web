import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | profile/settings/-components/route-content/security-settings', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onDeleteAccountToastCompletion', () => {});
  });

  test('should show <SecuritySettingsDeleteAccount />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/settings/-components/route-content/security-settings/security-settings-delete-account');

    // Act
    await render(hbs`
      {{profile/settings/-components/route-content/security-settings
        --onDeleteAccountToastCompletion=(action onDeleteAccountToastCompletion)
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      router: 'instance',
      onDeleteAccountToastCompletion: 'function',
    });
  });
});
