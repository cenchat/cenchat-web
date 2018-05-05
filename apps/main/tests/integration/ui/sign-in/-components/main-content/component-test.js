import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sign-in/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show <SignInForm /> when not in fastboot', async function (assert) {
    assert.expect(1);

    // Arrange
    const fastboot = this.owner.lookup('service:fastboot');

    fastboot.set('isFastBoot', false);

    const spy = spyComponent(this, 'sign-in-form');

    // Act
    await render(hbs`{{sign-in/-components/main-content}}`);

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
    await render(hbs`{{sign-in/-components/main-content}}`);

    // Assert
    assert.ok(spy.notCalled);
  });
});
