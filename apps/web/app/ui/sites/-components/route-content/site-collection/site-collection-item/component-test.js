import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | sites/-components/route-content/site-collection/site-collection-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.get('site', 'site_a'));
  });

  test('should show site', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{sites/-components/route-content/site-collection/site-collection-item --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="name"]').hasText('Site A');
    assert.dom('[data-test-site-collection-item="hostname"]').hasText('site-a.com');
  });

  test('should show site image when available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/-components/route-content/site-collection/site-collection-item --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="image"]').hasAttribute('src', 'site_a.jpg');
  });

  test('should hide site image when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.imageUrl', null);

    // Act
    await render(hbs`
      {{sites/-components/route-content/site-collection/site-collection-item --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="image"]').doesNotExist();
  });

  test('should mark as unverified when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    // Act
    await render(hbs`
      {{sites/-components/route-content/site-collection/site-collection-item --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="unverified-status"]').exists();
  });

  test('should not mark as unverified when site is verified', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/-components/route-content/site-collection/site-collection-item --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="unverified-status"]').doesNotExist();
  });
});
