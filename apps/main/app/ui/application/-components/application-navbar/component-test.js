import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | application/-components/application-navbar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show home link when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', null);

    // Act
    await render(hbs`{{application/-components/application-navbar --session=session}}`);

    // Assert
    assert.dom('[data-test-application-navbar="home-link"]').exists();
  });

  test('should show sign in link when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', null);

    // Act
    await render(hbs`{{application/-components/application-navbar --session=session}}`);

    // Assert
    assert.dom('[data-test-application-navbar="sign-in-link"]').exists();
  });

  test('should show notification link when signed in', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{application/-components/application-navbar --session=session}}`);

    // Assert
    assert.dom('[data-test-application-navbar="notification-link"]').exists();
  });

  test('should show profile link when signed in', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{application/-components/application-navbar --session=session}}`);

    // Assert
    assert.dom('[data-test-application-navbar="profile-link"]').exists();
  });

  test('should show search link when signed in', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{application/-components/application-navbar --session=session}}`);

    // Assert
    assert.dom('[data-test-application-navbar="search-link"]').exists();
  });

  test('should show sites link when signed in', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{application/-components/application-navbar --session=session}}`);

    // Assert
    assert.dom('[data-test-application-navbar="sites-link"]').exists();
  });
});
