import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | email-link-auth/email-link-auth-sign-in/sign-in-more-info', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onEmailLinkSignInClick', () => {});
  });

  test('should enable sign in button when display name is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{email-link-auth/email-link-auth-sign-in/sign-in-more-info
          --onEmailLinkSignInClick=(action onEmailLinkSignInClick)}}
    `);

    // Act
    await fillIn('[data-test-sign-in-more-info="display-name-field"] input', 'Foo');

    // Assert
    assert.dom('[data-test-sign-in-more-info="sign-in-button"]').isNotDisabled();
  });

  test('should disable sign in button when display name is invalid', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{email-link-auth/email-link-auth-sign-in/sign-in-more-info
          --onEmailLinkSignInClick=(action onEmailLinkSignInClick)}}
    `);

    // Assert
    assert.dom('[data-test-sign-in-more-info="sign-in-button"]').isDisabled();
  });

  test('should fire an external action when clicking send link', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onEmailLinkSignInClick');

    await render(hbs`
      {{email-link-auth/email-link-auth-sign-in/sign-in-more-info
          --onEmailLinkSignInClick=(action onEmailLinkSignInClick)}}
    `);
    await fillIn('[data-test-sign-in-more-info="display-name-field"] input', 'Foo');

    // Act
    await click('[data-test-sign-in-more-info="sign-in-button"]');

    // Assert
    assert.ok(spy.calledWith('Foo'));
  });
});
