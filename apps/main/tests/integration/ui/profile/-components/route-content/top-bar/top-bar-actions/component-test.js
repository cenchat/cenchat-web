import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/-components/route-content/top bar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await this.get('session.model');

    this.set('user', user);
    this.set('onSignOutClick', () => {});
    this.set('onFollowUserClick', () => {});
    this.set('onUnfollowUserClick', () => {});
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
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
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
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
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
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
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
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
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
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Act
    await click('[data-test-top-bar-actions="sign-out-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show follow button when not following the user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_c');
    });

    this.set('user', user);

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar-actions="follow-user-button"]').exists();
  });

  test('should hide follow button when following the user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_b');
    });

    this.set('user', user);

    this.set(
      'session.model.isFollowing',
      sinon.stub().returns(stubPromise(true, true)),
    );

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar-actions="unfollow-user-button"]').exists();
  });

  test('should fire an external action when clicking follow user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_c');
    });

    this.set('user', user);

    const spy = sinon.spy(this, 'onFollowUserClick');

    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Act
    await click('[data-test-top-bar-actions="follow-user-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should fire an external action when clicking follow user', async function(assert) {
    assert.expect(1);

    // Arrange
    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_b');
    });

    this.set('user', user);

    this.set(
      'session.model.isFollowing',
      sinon.stub().returns(stubPromise(true, true)),
    );

    const spy = sinon.spy(this, 'onUnfollowUserClick');

    await render(hbs`
      {{profile/-components/route-content/top-bar/top-bar-actions
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)
          --onFollowUserClick=(action onFollowUserClick)
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Act
    await click('[data-test-top-bar-actions="unfollow-user-button"]');

    // Assert
    assert.ok(spy.calledWith(this.get('user')));
  });
});
