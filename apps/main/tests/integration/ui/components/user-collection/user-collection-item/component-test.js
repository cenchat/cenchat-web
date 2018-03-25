import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | user-collection/user-collection-item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_a');
    });

    this.set('user', user);
    this.set('type', 'follow');
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show user info', async function(assert) {
    assert.expect(2);

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.dom('[data-test-user-collection-item="photo"]').hasAttribute(
      'src',
      'user_a.jpg',
    );
    assert.dom('[data-test-user-collection-item="name"]').hasText('User A');
  });

  test('should show user username when available', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('user.displayUsername', 'foo');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.dom('[data-test-user-collection-item="username"]').hasText('@foo');
  });

  test('should hide user username when unavailable', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.dom('[data-test-user-collection-item="username"]').doesNotExist();
  });

  test('should show <FollowUserButton /> when type is follow', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('type', 'follow');

    const spy = spyComponent(this, 'follow-user-button');

    // Act
    await render(hbs`
      {{user-collection/user-collection-item
          --user=user
          --type=type}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { userToFollow: 'instance' });
  });

  test('should hide <FollowUserButton /> when type is not follow', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'follow-user-button');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <UnfollowUserButton /> when type is follow', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('type', 'unfollow');

    const spy = spyComponent(this, 'unfollow-user-button');

    // Act
    await render(hbs`
      {{user-collection/user-collection-item
          --user=user
          --type=type}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { userToUnfollow: 'instance' });
  });

  test('should hide <UnfollowUserButton /> when type is not follow', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'unfollow-user-button');

    // Act
    await render(hbs`{{user-collection/user-collection-item --user=user}}`);

    // Assert
    assert.ok(spy.notCalled);
  });
});
