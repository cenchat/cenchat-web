import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/-components/route-content/following-collection/following collection item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const following = await run(() => {
      return this.get('store').findRecord('user', 'user_a');
    });

    this.set('following', following);
    this.set('onUnfollowUserClick', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show following info', async function(assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{profile/-components/route-content/following-collection/following-collection-item
          --following=following
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-following-collection-item="photo"]')
      .hasAttribute('src', 'user_a.jpg');
    assert
      .dom('[data-test-following-collection-item="name"]')
      .hasText('User A');
  });

  test('should show following username when available', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('following.displayUsername', 'foo');

    // Act
    await render(hbs`
      {{profile/-components/route-content/following-collection/following-collection-item
          --following=following
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-following-collection-item="username"]')
      .hasText('@foo');
  });

  test('should hide following username when unavailable', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile/-components/route-content/following-collection/following-collection-item
          --following=following
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-following-collection-item="username"]')
      .doesNotExist();
  });

  test('should fire an external action when clicking unfollow', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onUnfollowUserClick');

    await render(hbs`
      {{profile/-components/route-content/following-collection/following-collection-item
          --following=following
          --onUnfollowUserClick=(action onUnfollowUserClick)}}
    `);

    // Act
    await click('[data-test-following-collection-item="unfollow-user-button"]');

    // Assert
    assert.ok(spy.calledWith(this.get('following')));
  });
});
