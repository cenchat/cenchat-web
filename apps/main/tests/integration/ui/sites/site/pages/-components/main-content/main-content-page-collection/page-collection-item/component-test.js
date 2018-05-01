import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/-components/main-content/main-content-page-collection/page-collection-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('page', await this.store.findRecord('page', 'site_a__page_a'));
  });

  test('should show page info', async (assert) => {
    assert.expect(5);

    // Act
    await render(hbs`
      {{sites/site/pages/-components/main-content/main-content-page-collection/page-collection-item
          --page=page}}
    `);

    // Assert
    assert.dom('[data-test-page-collection-item="image"]').hasAttribute('src', 'page_a.jpg');
    assert.dom('[data-test-page-collection-item="title"]').hasText('Page A Title');
    assert.dom('[data-test-page-collection-item="description"]').hasText('Page A Description');
    assert.dom('[data-test-page-collection-item="slug"]').hasText('/foo/bar');
    assert.dom('[data-test-page-collection-item="id"]').hasText('site_a__page_a');
  });

  test('should hide page image when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('page.imageUrl', null);

    // Act
    await render(hbs`
      {{sites/site/pages/-components/main-content/main-content-page-collection/page-collection-item
          --page=page}}
    `);

    // Assert
    assert.dom('[data-test-page-collection-item="image"]').doesNotExist();
  });
});
