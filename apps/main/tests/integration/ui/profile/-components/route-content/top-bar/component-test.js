import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

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
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show user info', async function(assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="photo"]').hasAttribute('src', 'user_a.jpg');
    assert.dom('[data-test-top-bar="name"]').hasText('User A');
  });

  test('should show <TopBarActions />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/-components/route-content/top-bar/top-bar-actions');

    // Act
    await render(hbs`
      {{profile/-components/route-content/top-bar
          --session=session
          --user=user
          --onSignOutClick=(action onSignOutClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      user: 'instance',
      onSignOutClick: 'function',
    });
  });
});
