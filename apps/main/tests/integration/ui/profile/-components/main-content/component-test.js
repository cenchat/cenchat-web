import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | profile/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const userB = await this.store.findRecord('user', 'user_b');
    const currentUser = this.session.model;

    this.set('user', currentUser);
    this.set('followingSuggestions', [userB]);
    this.set('followings', await currentUser.get('followings'));
  });

  test('should show <FollowSuggestionCollection /> if current user owns the profile and has a facebook ID', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.facebookId', 12345);

    const spy = spyComponent(this, 'profile/-components/main-content/follow-suggestion-collection');

    // Act
    await render(hbs`
      {{profile/-components/main-content
          --session=session
          --user=user
          --followingSuggestions=followingSuggestions
          --followings=followings}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { followingSuggestions: 'array' });
  });

  test('should hide <FollowSuggestionCollection /> if current user does not own the profile', async function (assert) {
    assert.expect(1);

    // Arrange
    const user = await this.store.findRecord('user', 'user_b');

    this.set('user', user);

    const spy = spyComponent(this, 'profile/-components/main-content/follow-suggestion-collection');

    // Act
    await render(hbs`
      {{profile/-components/main-content
          --session=session
          --user=user
          --followingSuggestions=followingSuggestions
          --followings=followings}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <FollowingCollection /> if current user owns the profile', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/-components/main-content/following-collection');

    // Act
    await render(hbs`
      {{profile/-components/main-content
          --session=session
          --user=user
          --followingSuggestions=followingSuggestions
          --followings=followings}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { followings: 'instance' });
  });

  test('should hide <FollowingCollection /> if current user doesn\'t own the profile', async function (assert) {
    assert.expect(1);

    // Arrange
    const user = await this.store.findRecord('user', 'user_b');

    this.set('user', user);

    const spy = spyComponent(this, 'profile/-components/main-content/following-collection');

    // Act
    await render(hbs`
      {{profile/-components/main-content
          --session=session
          --user=user
          --followingSuggestions=followingSuggestions
          --followings=followings}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
