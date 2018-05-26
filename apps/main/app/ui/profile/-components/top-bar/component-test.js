import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | profile/-components/top-bar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.get('session.model');

    this.set('user', user);
    this.set('onSignOutClick', () => {});
  });

  test('should show user info', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{profile/-components/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="photo"]').hasAttribute('src', 'user_a.jpg');
    assert.dom('[data-test-top-bar="name"]').hasText('User A');
  });

  test('should show edit link when current user owns the profile', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile/-components/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="edit-link"]').exists();
  });

  test('should hide edit link when current user does not own the profile', async function (assert) {
    assert.expect(1);

    // Arrange
    const user = await this.store.findRecord('user', 'user_b');

    this.set('user', user);

    // Act
    await render(hbs`
      {{profile/-components/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="edit-link"]').doesNotExist();
  });

  test('should show more button when current user owns the profile', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile/-components/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="more-button"]').exists();
  });

  test('should hide more button when current user does not own the profile', async function (assert) {
    assert.expect(1);

    // Arrange
    const user = await this.store.findRecord('user', 'user_b');

    this.set('user', user);

    // Act
    await render(hbs`
      {{profile/-components/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="more-button"]').doesNotExist();
  });

  test('should fire an external action when clicking sign out', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSignOutClick');

    await render(hbs`
      {{profile/-components/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Act
    await click('[data-test-top-bar="sign-out-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
