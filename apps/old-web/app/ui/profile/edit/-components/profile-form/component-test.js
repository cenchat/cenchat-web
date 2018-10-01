import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | profile/edit/-components/profile-form', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.get('session.model');

    this.set('user', user);
    this.set('onProfileFormSubmit', () => false);
  });

  test('should should enable submit button when name and username is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/edit/-components/profile-form
          --user=user
          --onProfileFormSubmit=(action onProfileFormSubmit)}}
    `);

    // Act
    await fillIn('[data-test-profile-form="display-name-field"] input', 'Foo Bar');
    await fillIn('[data-test-profile-form="username-field"] input', 'Foo');

    // Assert
    assert.dom('[data-test-profile-form="submit-button"]').doesNotHaveAttribute('disabled');
  });

  test('should disable submit button when username is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/edit/-components/profile-form
          --user=user
          --onProfileFormSubmit=(action onProfileFormSubmit)}}
    `);

    await fillIn('[data-test-profile-form="display-name-field"] input', 'Foo Bar');

    // Act
    await fillIn('[data-test-profile-form="username-field"] input', '-foo');

    // Assert
    assert.dom('[data-test-profile-form="submit-button"]').hasAttribute('disabled');
  });

  test('should fire an external action when clicking submit', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onProfileFormSubmit');

    await render(hbs`
      {{profile/edit/-components/profile-form
          --user=user
          --onProfileFormSubmit=(action onProfileFormSubmit)}}
    `);

    // Act
    await fillIn('[data-test-profile-form="display-name-field"] input', 'Display Name');
    await fillIn('[data-test-profile-form="short-bio-field"] input', 'Short Bio');
    await fillIn('[data-test-profile-form="username-field"] input', 'Username');
    await click('[data-test-profile-form="submit-button"]');

    // Assert
    assert.ok(spy.calledWith({
      displayName: 'Display Name',
      shortBio: 'Short Bio',
      username: 'Username',
    }));
  });
});
