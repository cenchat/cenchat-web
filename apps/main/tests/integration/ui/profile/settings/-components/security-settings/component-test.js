import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | profile/settings/-components/security-settings', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onDeleteAccountToastCompletion', () => {});
  });

  test('should show <SecuritySettingsDeleteAccount />', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'profile/settings/-components/security-settings/security-settings-delete-account');

    // Act
    await render(hbs`
      {{profile/settings/-components/security-settings
          --onDeleteAccountToastCompletion=(action onDeleteAccountToastCompletion)}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, { onDeleteAccountToastCompletion: 'function' });
  });
});
