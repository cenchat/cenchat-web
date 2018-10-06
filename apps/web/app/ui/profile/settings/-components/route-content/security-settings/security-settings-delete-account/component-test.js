import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | profile/settings/-components/route-content/security-settings/security-settings-delete-account', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onDeleteAccountToastCompletion', () => {});
  });

  test('should show confirm delete content when clicking delete', async function (assert) {
    assert.expect(3);

    // Arrange
    await render(hbs`
      {{profile/settings/-components/route-content/security-settings/security-settings-delete-account
        --router=(lookup "service:router")
        --onDeleteAccountToastCompletion=(action onDeleteAccountToastCompletion)
      }}
    `);

    // Act
    await click('[data-test-security-settings-delete-account="delete-button"]');

    // Assert
    assert.dom('[data-test-security-settings-delete-account="confirm-message"]').exists();
    assert.dom('[data-test-security-settings-delete-account="confirm-field"]').exists();
    assert.dom('[data-test-security-settings-delete-account="confirm-delete-button"]').exists();
  });

  test('should disable confirm delete button when inputting a wrong confirmation key', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/settings/-components/route-content/security-settings/security-settings-delete-account
        --router=(lookup "service:router")
        --onDeleteAccountToastCompletion=(action onDeleteAccountToastCompletion)
      }}
    `);

    await click('[data-test-security-settings-delete-account="delete-button"]');

    // Act
    await fillIn('[data-test-security-settings-delete-account="confirm-field"] input', 'foobar');

    // Assert
    assert.dom('[data-test-security-settings-delete-account="confirm-delete-button"]').isDisabled();
  });

  test('should enable confirm delete button when inputting a correct confirmation key', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/settings/-components/route-content/security-settings/security-settings-delete-account
        --router=(lookup "service:router")
        --onDeleteAccountToastCompletion=(action onDeleteAccountToastCompletion)
      }}
    `);

    await click('[data-test-security-settings-delete-account="delete-button"]');

    const confirmationKey = this.element
      .querySelector('[data-test-security-settings-delete-account="confirm-field"] div')
      .textContent
      .trim()
      .substr(26, 5);

    // Act
    await fillIn(
      '[data-test-security-settings-delete-account="confirm-field"] input',
      confirmationKey,
    );

    // Assert
    assert
      .dom('[data-test-security-settings-delete-account="confirm-delete-button"]')
      .isNotDisabled();
  });
});
