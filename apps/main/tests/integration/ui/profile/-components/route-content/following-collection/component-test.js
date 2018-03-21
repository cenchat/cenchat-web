import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/-components/route-content/following collection', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = this.get('session.model');

    this.set('user', user);
    this.set('onUnfollowUserClick', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <InfiniteContent />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'infinite-content');

    // Act
    await render(hbs`
      {{profile/-components/route-content/following-collection
          --user=user
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { 'query': 'instance' });
  });

  test('should show <FollowingCollectionItem /> for each following', async function(assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'profile/-components/route-content/following-collection/following-collection-item');

    // Act
    await render(hbs`
      {{profile/-components/route-content/following-collection
          --user=user
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      'following': 'instance',
      'onUnfollowUserClick': 'function',
    });
  });

  test('should show empty state when there are no followings :(', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('user', {
      followings: Promise.resolve([]),
    });

    // Act
    await render(hbs`
      {{profile/-components/route-content/following-collection
          --user=user
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert.dom('[data-test-following-collection="empty-state"]').exists();
  });
});
