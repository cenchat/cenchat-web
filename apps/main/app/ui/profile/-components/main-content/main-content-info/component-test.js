import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | profile/-components/main-content/main-content-info', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.store.findRecord('user', 'user_c');

    this.set('user', user);
  });

  test('should show user photo', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/-components/main-content/main-content-info --session=session --user=user}}
    `);

    // Assert
    assert.dom('[data-test-main-content-info="photo"]').hasAttribute(
      'src',
      'https://graph.facebook.com/null/picture?type=large',
    );
  });

  test('should show short bio when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.shortBio', 'Foo');

    await render(hbs`
      {{profile/-components/main-content/main-content-info --session=session --user=user}}
    `);

    // Assert
    assert.dom('[data-test-main-content-info="short-bio"]').hasText('Foo');
  });

  test('should hide short bio when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.shortBio', null);

    await render(hbs`
      {{profile/-components/main-content/main-content-info --session=session --user=user}}
    `);

    // Assert
    assert.dom('[data-test-main-content-info="short-bio"]').doesNotExist();
  });

  test('should show username when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.displayUsername', 'Foo');
    this.set('user.username', 'foo');

    await render(hbs`
      {{profile/-components/main-content/main-content-info --session=session --user=user}}
    `);

    // Assert
    assert.dom('[data-test-main-content-info="username"]').hasText('@Foo');
  });

  test('should hide username when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.displayUsername', null);
    this.set('user.username', null);

    await render(hbs`
      {{profile/-components/main-content/main-content-info --session=session --user=user}}
    `);

    // Assert
    assert.dom('[data-test-main-content-info="username"]').doesNotExist();
  });

  test('should show follow button when not following user', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'follow-user-button');

    await render(hbs`
      {{profile/-components/main-content/main-content-info --session=session --user=user}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, {
      userToFollow: 'instance',
      onFollowUser: 'function',
    });
  });

  test('should show unfollow button when following user', async function (assert) {
    assert.expect(2);

    // Arrange
    const user = await this.store.findRecord('user', 'user_b');

    this.set('user', user);

    const spy = spyComponent(this, 'unfollow-user-button');

    await render(hbs`
      {{profile/-components/main-content/main-content-info --session=session --user=user}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.componentArgsType, {
      userToUnfollow: 'instance',
      onUnfollowUser: 'function',
    });
  });
});
