import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | user-collection/user-collection-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('user', await this.store.findRecord('user', 'user_b'));
  });

  test('should show user info', async (assert) => {
    assert.expect(2);

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.dom('[data-test-user-collection-item="photo"]').hasAttribute(
      'src',
      'user_b.jpg',
    );
    assert.dom('[data-test-user-collection-item="name"]').hasText('User B');
  });

  test('should show user username when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.displayUsername', 'user_b');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.dom('[data-test-user-collection-item="username"]').hasText('@user_b');
  });

  test('should hide user username when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.displayUsername', null);

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.dom('[data-test-user-collection-item="username"]').doesNotExist();
  });

  test('should show <FollowUserButton /> when current user is not following the user', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user', await this.store.findRecord('user', 'user_c'));

    const spy = spyComponent(this, 'follow-user-button');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { userToFollow: 'instance', onFollowUser: 'function' });
  });

  test('should hide <FollowUserButton /> when current user is following the user', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'follow-user-button');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <UnfollowUserButton /> when current user is following the user', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('type', 'unfollow');

    const spy = spyComponent(this, 'unfollow-user-button');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      userToUnfollow: 'instance',
      onUnfollowUser: 'function',
    });
  });

  test('should hide <UnfollowUserButton /> when current user is not following the user', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user', await this.store.findRecord('user', 'user_c'));

    const spy = spyComponent(this, 'unfollow-user-button');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.ok(spy.notCalled);
  });
});
