import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { stubService } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/index/-components/route-content/site-collection/site collection item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const site = await run(() => this.get('store').findRecord('site', 'site_b'));

    this.set('router', stubService(this, 'router'));
    this.set('site', site);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show site info', async (assert) => {
    assert.expect(5);

    // Act
    await render(hbs`
      {{sites/index/-components/route-content/site-collection/site-collection-item
          --router=router
          --site=site}}
    `);

    // Assert
    assert
      .dom('[data-test-site-collection-item="image"]')
      .hasAttribute('src', 'site_b.jpg');
    assert.dom('[data-test-site-collection-item="name"]').hasText('Site B');
    assert
      .dom('[data-test-site-collection-item="hostname"]')
      .hasText('site-b.com');
    assert
      .dom('[data-test-site-collection-item="id"]')
      .hasText('site_b');
    assert.dom('[data-test-site-collection-item="unverified"]').exists();
  });

  test('should hide site image when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.imageUrl', null);

    // Act
    await render(hbs`
      {{sites/index/-components/route-content/site-collection/site-collection-item
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
      {{sites/index/-components/route-content/site-collection/site-collection-item
          --router=router
          --site=site}}
    `);

    // Assert
    assert.dom('[data-test-site-collection-item="unverified"]').doesNotExist();
  });
});
