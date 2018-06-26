import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | email-link-auth', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('redirectUrl', 'https://example.com');
  });

  test('should show <EmailLinkAuthSignIn /> when signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    this.firebase.auth = sinon.stub().returns({
      isSignInWithEmailLink: sinon.stub().returns(true),
    });

    const spy = spyComponent(this, 'email-link-auth/email-link-auth-sign-in');

    // Act
    await render(hbs`{{email-link-auth --redirectUrl=redirectUrl}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      firebase: 'instance',
      onSignInClick: 'function',
    });
  });

  test('should hide <EmailLinkAuthSignIn /> when not signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    this.firebase.auth = sinon.stub().returns({
      isSignInWithEmailLink: sinon.stub().returns(false),
    });

    const spy = spyComponent(this, 'email-link-auth/email-link-auth-sign-in');

    // Act
    await render(hbs`{{email-link-auth --redirectUrl=redirectUrl}}`);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <EmailLinkAuthSendLink /> when not signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    this.firebase.auth = sinon.stub().returns({
      isSignInWithEmailLink: sinon.stub().returns(false),
    });

    const spy = spyComponent(this, 'email-link-auth/email-link-auth-send-link');

    // Act
    await render(hbs`{{email-link-auth --redirectUrl=redirectUrl}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { firebase: 'instance', redirectUrl: 'string' });
  });

  test('should show <EmailLinkAuthSendLink /> when signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    this.firebase.auth = sinon.stub().returns({
      isSignInWithEmailLink: sinon.stub().returns(true),
    });

    const spy = spyComponent(this, 'email-link-auth/email-link-auth-send-link');

    // Act
    await render(hbs`{{email-link-auth --redirectUrl=redirectUrl}}`);

    // Assert
    assert.ok(spy.notCalled);
  });
});
