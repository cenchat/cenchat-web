import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | email-link-auth/email-link-auth-send-link', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('auth', {
      sendSignInLinkToEmail() {
        return Promise.resolve();
      },

      signInAnonymously() {
        return Promise.resolve();
      },
    });
    this.set('firebase.auth', () => this.auth);
    this.set('isAnonymousAllowed', true);
    this.set('onContinueAnonymouslyClick', () => {});
  });

  test('should enable send link button when email is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{email-link-auth/email-link-auth-send-link
          --firebase=firebase
          --isAnonymousAllowed=isAnonymousAllowed
          --onContinueAnonymouslyClick=(action onContinueAnonymouslyClick)}}
    `);

    // Act
    await fillIn('[data-test-email-link-auth-send-link="email-field"] input', 'foo@gmail.com');

    // Assert
    assert.dom('[data-test-email-link-auth-send-link="send-link-button"]').isNotDisabled();
  });

  test('should disable send link button when email is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{email-link-auth/email-link-auth-send-link
          --firebase=firebase
          --isAnonymousAllowed=isAnonymousAllowed
          --onContinueAnonymouslyClick=(action onContinueAnonymouslyClick)}}
    `);

    // Act
    await fillIn('[data-test-email-link-auth-send-link="email-field"] input', 'foo');

    // Assert
    assert.dom('[data-test-email-link-auth-send-link="send-link-button"]').isDisabled();
  });

  test('should send sign in link to email when clicking send link', async function (assert) {
    assert.expect(1);

    // Arrange
    const sendSignInLinkToEmailSpy = sinon.spy(this.auth, 'sendSignInLinkToEmail');

    await render(hbs`
      {{email-link-auth/email-link-auth-send-link
          --firebase=firebase
          --isAnonymousAllowed=isAnonymousAllowed
          --onContinueAnonymouslyClick=(action onContinueAnonymouslyClick)}}
    `);
    await fillIn('[data-test-email-link-auth-send-link="email-field"] input', 'foo@gmail.com');

    // Act
    await click('[data-test-email-link-auth-send-link="send-link-button"]');

    // Assert
    assert.ok(sendSignInLinkToEmailSpy.calledOnce);
  });

  test('should show or anonymous message when requested', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{email-link-auth/email-link-auth-send-link
          --firebase=firebase
          --isAnonymousAllowed=true
          --onContinueAnonymouslyClick=(action onContinueAnonymouslyClick)}}
    `);

    // Assert
    assert.dom('[data-test-email-link-auth-send-link="or-anonymous"]').exists();
  });

  test('should hide or anonymous message when requested', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isAnonymousAllowed', false);

    // Act
    await render(hbs`
      {{email-link-auth/email-link-auth-send-link
          --firebase=firebase
          --isAnonymousAllowed=isAnonymousAllowed
          --onContinueAnonymouslyClick=(action onContinueAnonymouslyClick)}}
    `);

    // Assert
    assert.dom('[data-test-email-link-auth-send-link="or-anonymous"]').doesNotExist();
  });

  test('should fire an external action when clicking continue anonymously', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{email-link-auth/email-link-auth-send-link
          --firebase=firebase
          --isAnonymousAllowed=true
          --onContinueAnonymouslyClick=(action onContinueAnonymouslyClick)}}
    `);

    // Act
    await click('[data-test-email-auth-send-link="continue-anonymously-button"]');

    // Assert
    assert.dom('[data-test-email-link-auth-send-link="or-anonymous"]').exists();
  });
});
