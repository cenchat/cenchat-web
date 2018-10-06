import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | profile/-components/route-header', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.get('session.model');

    this.set('user', user);
    this.set('onSignOutClick', () => {});
  });

  test('should show user display name', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile/-components/route-header
        --user=user
        --onSignOutClick=(action onSignOutClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="name"]').hasText('User A');
  });

  test('should fire an external action when clicking sign out', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSignOutClick');

    await render(hbs`
      {{profile/-components/route-header
        --user=user
        --onSignOutClick=(action onSignOutClick)
      }}
    `);

    // Act
    await click('[data-test-route-header="sign-out-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
