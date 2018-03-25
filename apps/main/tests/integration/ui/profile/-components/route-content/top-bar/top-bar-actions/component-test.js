import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';
import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/-components/route-content/top-bar-actions', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await this.get('session.model');

    this.set('user', user);
    this.set('onSignOutClick', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show edit profile button when the owner of the profile', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar-actions="edit-link"]').exists();
  });

  test('should hide edit profile button when not the owner of the profile', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_b');
    });

    this.set('user', user);

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar-actions="edit-link"]').doesNotExist();
  });

  test('should show sign out button when the owner of the profile', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar-actions="sign-out-button"]').exists();
  });

  test('should hide sign out button when not the owner of the profile', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_b');
    });

    this.set('user', user);

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar-actions="sign-out-button"]').doesNotExist();
  });

  test('should fire an external action when clicking sign out', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSignOutClick');

    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Act
    await click('[data-test-top-bar-actions="sign-out-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show <FollowUserButton /> when not following the user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_c');
    });

    this.set('user', user);

    const spy = spyComponent(this, 'follow-user-button');

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      userToFollow: 'instance',
      onFollowUser: 'function',
    });
  });

  test('should hide <FollowUserButton /> when following the user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_b');
    });

    this.set('user', user);

    const spy = spyComponent(this, 'follow-user-button');

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <UnfollowUserButton /> when following the user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_b');
    });

    this.set('user', user);

    const spy = spyComponent(this, 'unfollow-user-button');

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      userToUnfollow: 'instance',
      onUnfollowUser: 'function',
    });
  });

  test('should hide <UnfollowUserButton /> when not following the user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_c');
    });

    this.set('user', user);

    const spy = spyComponent(this, 'unfollow-user-button');

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
