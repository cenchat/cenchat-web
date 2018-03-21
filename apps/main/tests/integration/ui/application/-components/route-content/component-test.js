import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | application/-components/route content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show navbar when signed in', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert.dom('[data-test-application="navbar"]').exists();
  });

  test('should show navbar when signed out', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', false);

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert.dom('[data-test-application="navbar"]').doesNotExist();
  });

  test('should show profile username link when session model has a username', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model.username', 'username');

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert.dom('[data-test-application="profile-username-link"]').exists();
  });

  test('should hide profile username link when session model doesn\'t have a username', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert
      .dom('[data-test-application="profile-username-link"]')
      .doesNotExist();
  });

  test('should show profile ID link when session model doesn\'t have a username', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert.dom('[data-test-application="profile-id-link"]').exists();
  });

  test('should hide profile ID link when session model has a username', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model.username', 'username');

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert.dom('[data-test-application="profile-id-link"]').doesNotExist();
  });
});
