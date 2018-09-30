import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/pages/-components/main-content/main-content-page-collection/page-collection-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('page', await this.store.findRecord('page', 'site_a__page_a'));
    this.set('onRescrapePageClick', () => {});
  });

  test('should show page info', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`
      {{sites/site/pages/-components/main-content/main-content-page-collection/page-collection-item
          --page=page
          --onRescrapePageClick=(action onRescrapePageClick)}}
    `);

    // Assert
    assert.dom('[data-test-page-collection-item="image"]').hasAttribute('src', 'page_a.jpg');
    assert.dom('[data-test-page-collection-item="title"]').hasText('Page A Title');
    assert.dom('[data-test-page-collection-item="id"]').hasText('ID: page_a');
  });

  test('should hide page image when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('page.imageUrl', null);

    // Act
    await render(hbs`
      {{sites/site/pages/-components/main-content/main-content-page-collection/page-collection-item
          --page=page
          --onRescrapePageClick=(action onRescrapePageClick)}}
    `);

    // Assert
    assert.dom('[data-test-page-collection-item="image"]').doesNotExist();
  });

  test('should fire an external action when clicking rescrape page', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onRescrapePageClick');

    await render(hbs`
      {{sites/site/pages/-components/main-content/main-content-page-collection/page-collection-item
          --page=page
          --onRescrapePageClick=(action onRescrapePageClick)}}
    `);

    // Act
    await click('[data-test-page-collection-item="rescrape-page-button"]');

    // Assert
    assert.ok(spy.calledWith(this.page));
  });
});
