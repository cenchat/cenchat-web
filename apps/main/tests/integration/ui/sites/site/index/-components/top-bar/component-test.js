import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/index/-components/top-bar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.findRecord('site', 'site_a'));
  });

  test('should show site name', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="name"]').hasText('Site A');
  });

  test('should show manage link when site is verified', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="manage-link"]').exists();
  });

  test('should hide manage link when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    // Act
    await render(hbs`
      {{sites/site/index/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="manage-link"]').doesNotExist();
  });

  test('should show docs link when site is verified', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="docs-link"]').exists();
  });

  test('should hide docs link when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    // Act
    await render(hbs`
      {{sites/site/index/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="docs-link"]').doesNotExist();
  });

  test('should show tabs when site is verified', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="tabs"]').exists();
  });

  test('should hide tabs when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    // Act
    await render(hbs`
      {{sites/site/index/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="tabs"]').doesNotExist();
  });
});
