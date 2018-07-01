import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | profile/settings/-components/account-settings', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should enable update button when there are valid changes to be made', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/settings/-components/account-settings --session=session --router=router}}
    `);

    // Act
    await fillIn('[data-test-account-settings="email-field"] input', 'new@gmail.com');

    // Assert
    assert.dom('[data-test-account-settings="update-button"]').isNotDisabled();
  });

  test('should disable update button when new email is the same with the current email', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/settings/-components/account-settings --session=session --router=router}}
    `);

    // Assert
    assert.dom('[data-test-account-settings="update-button"]').isDisabled();
  });

  test('should change email when clicking update', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this.session.currentUser, 'updateEmail');

    await render(hbs`
      {{profile/settings/-components/account-settings --session=session --router=router}}
    `);
    await fillIn('[data-test-account-settings="email-field"] input', 'new@gmail.com');

    // Act
    await click('[data-test-account-settings="update-button"]');

    // Assert
    assert.ok(spy.calledWithExactly('new@gmail.com'));
  });
});
