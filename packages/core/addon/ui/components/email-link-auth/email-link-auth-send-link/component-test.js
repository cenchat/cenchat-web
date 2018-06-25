import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';

module('Integration | Component | email-link-auth/email-link-auth-send-link', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('auth', {
      sendSignInLinkToEmail() {
        return stubPromise(true);
      },
    });
    this.set('firebase.auth', () => this.auth);
  });

  test('should enable send link button when email is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`{{email-link-auth/email-link-auth-send-link --firebase=firebase}}`);

    // Act
    await fillIn('[data-test-email-link-auth-send-link="email-field"] input', 'foo@gmail.com');

    // Assert
    assert.dom('[data-test-email-link-auth-send-link="send-link-button"]').isNotDisabled();
  });

  test('should disable send link button when email is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`{{email-link-auth/email-link-auth-send-link --firebase=firebase}}`);

    // Act
    await fillIn('[data-test-email-link-auth-send-link="email-field"] input', 'foo');

    // Assert
    assert.dom('[data-test-email-link-auth-send-link="send-link-button"]').isDisabled();
  });

  test('should send sign in link to email when clicking send link', async function (assert) {
    assert.expect(1);

    // Arrange
    const sendSignInLinkToEmailSpy = sinon.spy(this.auth, 'sendSignInLinkToEmail');

    await render(hbs`{{email-link-auth/email-link-auth-send-link --firebase=firebase}}`);
    await fillIn('[data-test-email-link-auth-send-link="email-field"] input', 'foo@gmail.com');

    // Act
    await click('[data-test-email-link-auth-send-link="send-link-button"]');

    // Assert
    assert.ok(sendSignInLinkToEmailSpy.calledOnce);
  });
});
