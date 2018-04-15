import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | home/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    this.set('onHandleSignInSuccess', () => {});
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <SignInForm /> when not in fastboot', async function (assert) {
    assert.expect(1);

    // Arrange
    const fastboot = this.owner.lookup('service:fastboot');

    fastboot.set('isFastBoot', false);

    const spy = spyComponent(this, 'sign-in-form');

    // Act
    await render(hbs`
      {{home/-components/route-content
          --onHandleSignInSuccess=(action onHandleSignInSuccess)}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should hide <SignInForm /> when in fastboot', async function (assert) {
    assert.expect(1);

    // Arrange
    const fastboot = this.owner.lookup('service:fastboot');

    fastboot.set('isFastBoot', true);

    const spy = spyComponent(this, 'sign-in-form');

    // Act
    await render(hbs`
      {{home/-components/route-content
          --onHandleSignInSuccess=(action onHandleSignInSuccess)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
