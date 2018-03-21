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

module('Integration | Component | sites/site/index/-components/route-content/page-collection/page collection item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const page = await run(() => {
      return this.get('store').findRecord('page', 'site_a__page_a');
    });

    this.set('router', stubService(this, 'router'));
    this.set('page', page);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show page info', async function(assert) {
    assert.expect(5);

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/page-collection/page-collection-item
          --router=router
          --page=page}}
    `);

    // Assert
    assert
      .dom('[data-test-page-collection-item="image"]')
      .hasAttribute('src', 'page_a.jpg');
    assert
      .dom('[data-test-page-collection-item="title"]')
      .hasText('Page A Title');
    assert
      .dom('[data-test-page-collection-item="description"]')
      .hasText('Page A Description');
    assert
      .dom('[data-test-page-collection-item="slug"]')
      .hasText('/foo/bar');
    assert
      .dom('[data-test-page-collection-item="id"]')
      .hasText('site_a__page_a');
  });

  test('should hide page image when unavailable', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('page.imageUrl', null);

    // Act
    await render(hbs`
    {{sites/site/index/-components/route-content/page-collection/page-collection-item
        --router=router
        --page=page}}
  `);

    // Assert
    assert.dom('[data-test-page-collection-item="image"]').doesNotExist();
  });
});
