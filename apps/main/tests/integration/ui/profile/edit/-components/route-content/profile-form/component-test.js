import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/edit/-components/route-content/profile form', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await this.get('session.model');

    this.set('user', user);

    this.set('onProfileFormSubmit', () => {
      return false;
    });
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should should enable submit button when name and username is valid', async function(assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/edit/-components/route-content/profile-form
          --user=user
          --onProfileFormSubmit=(action onProfileFormSubmit)}}
    `);

    // Act
    await fillIn(
      '[data-test-profile-form="display-name-field"] input',
      'Foo Bar',
    );
    await fillIn('[data-test-profile-form="username-field"] input', 'Foo');

    // Assert
    assert
      .dom('[data-test-profile-form="submit-button"]')
      .doesNotHaveAttribute('disabled');
  });

  test('should disable submit button when username is invalid', async function(assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/edit/-components/route-content/profile-form
          --user=user
          --onProfileFormSubmit=(action onProfileFormSubmit)}}
    `);

    await fillIn(
      '[data-test-profile-form="display-name-field"] input',
      'Foo Bar',
    );

    // Act
    await fillIn('[data-test-profile-form="username-field"] input', '-foo');

    // Assert
    assert
      .dom('[data-test-profile-form="submit-button"]')
      .hasAttribute('disabled');
  });

  test('should fire an external action when clicking submit', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onProfileFormSubmit');

    await render(hbs`
      {{profile/edit/-components/route-content/profile-form
          --user=user
          --onProfileFormSubmit=(action onProfileFormSubmit)}}
    `);

    // Act
    await fillIn(
      '[data-test-profile-form="display-name-field"] input',
      'Foo Bar',
    );
    await fillIn('[data-test-profile-form="username-field"] input', 'Foo');
    await click('[data-test-profile-form="submit-button"]');

    // Assert
    assert.ok(spy.calledWith({ displayName: 'Foo Bar', username: 'Foo' }));
  });
});
