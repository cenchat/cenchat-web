import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | site/page/-components/main-content/main-content-comments/comments-header', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onSignInClick', () => {});
  });

  test('should show filter comments button when signed in', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{site/page/-components/main-content/main-content-comments/comments-header
          --session=session
          --onSignInClick=(action onSignInClick)}}
    `);

    // Assert
    assert.dom('[data-test-comments-header="filter-comments-button"]').exists();
  });

  test('should hide filter comments button when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', null);

    // Act
    await render(hbs`
      {{site/page/-components/main-content/main-content-comments/comments-header
          --session=session
          --onSignInClick=(action onSignInClick)}}
    `);

    // Assert
    assert.dom('[data-test-comments-header="filter-comments-button"]').doesNotExist();
  });

  test('should fire an external action when clicking sign in', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', null);

    const spy = sinon.spy(this, 'onSignInClick');

    await render(hbs`
      {{site/page/-components/main-content/main-content-comments/comments-header
          --session=session
          --onSignInClick=(action onSignInClick)}}
    `);

    // Act
    await click('[data-test-comments-header="sign-in-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
