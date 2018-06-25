import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState, spyComponent, stubPromise } from '@cenchat/core/test-support';

module('Integration | Component | email-link-auth/email-link-auth-sign-in', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('auth', { fetchProvidersForEmail() {} });
    this.set('firebase.auth', () => this.auth);
    this.set('onSignInClick', () => {});
  });

  test('should enable continue button when email is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{email-link-auth/email-link-auth-sign-in
          --firebase=firebase
          --onSignInClick=(action onSignInClick)}}
    `);

    // Act
    await fillIn('[data-test-email-link-auth-sign-in="email-field"] input', 'foo@gmail.com');

    // Assert
    assert.dom('[data-test-email-link-auth-sign-in="continue-button"]').isNotDisabled();
  });

  test('should disable continue button when email is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{email-link-auth/email-link-auth-sign-in
          --firebase=firebase
          --onSignInClick=(action onSignInClick)}}
    `);

    // Act
    await fillIn('[data-test-email-link-auth-sign-in="email-field"] input', 'foo');

    // Assert
    assert.dom('[data-test-email-link-auth-sign-in="continue-button"]').isDisabled();
  });

  test('should fire an external action when clicking continue and email already exists', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('auth.fetchProvidersForEmail', sinon.stub().returns(stubPromise(true, ['password'])));

    const spy = sinon.spy(this, 'onSignInClick');

    await render(hbs`
      {{email-link-auth/email-link-auth-sign-in
          --firebase=firebase
          --onSignInClick=(action onSignInClick)}}
    `);
    await fillIn('[data-test-email-link-auth-sign-in="email-field"] input', 'foo@gmail.com');

    // Act
    await click('[data-test-email-link-auth-sign-in="continue-button"]');

    // Assert
    assert.ok(spy.calledWithExactly('foo@gmail.com'));
  });

  test('should show <SignInMoreInfo /> when clicking continue and email does not exist yet', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('auth.fetchProvidersForEmail', sinon.stub().returns(stubPromise(true, [])));

    const spy = spyComponent(this, 'email-link-auth/email-link-auth-sign-in/sign-in-more-info');

    await render(hbs`
      {{email-link-auth/email-link-auth-sign-in
          --firebase=firebase
          --onSignInClick=(action onSignInClick)}}
    `);
    await fillIn('[data-test-email-link-auth-sign-in="email-field"] input', 'foo@gmail.com');

    // Act
    await click('[data-test-email-link-auth-sign-in="continue-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, { onSignInClick: 'function' });
  });
});
