import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/index/-components/main-content/main-content-site-collection/site-collection-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.findRecord('site', 'site_b'));
  });

  test('should show site info', async (assert) => {
    assert.expect(5);

    // Act
    await render(hbs`
      {{sites/index/-components/main-content/main-content-site-collection/site-collection-item
          --router=router
          --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="image"]').hasAttribute('src', 'site_b.jpg');
    assert.dom('[data-test-site-collection-item="name"]').hasText('Site B');
    assert.dom('[data-test-site-collection-item="hostname"]').hasText('site-b.com');
    assert.dom('[data-test-site-collection-item="id"]').hasText('site_b');
    assert.dom('[data-test-site-collection-item="unverified"]').exists();
  });

  test('should hide site image when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.imageUrl', null);

    // Act
    await render(hbs`
      {{sites/index/-components/main-content/main-content-site-collection/site-collection-item
          --router=router
          --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="image"]').doesNotExist();
  });

  test('should hide unverified text when site is verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', true);

    // Act
    await render(hbs`
      {{sites/index/-components/main-content/main-content-site-collection/site-collection-item
          --router=router
          --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="unverified"]').doesNotExist();
  });
});
