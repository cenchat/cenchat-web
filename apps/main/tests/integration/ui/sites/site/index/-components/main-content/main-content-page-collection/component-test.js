import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/index/-components/main-content/main-content-page-collection', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const site = await this.store.findRecord('site', 'site_a');

    this.set('router', this.router);
    this.set('pages', await site.get('pages'));
  });

  test('should show <InfiniteContent />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'infinite-content');

    // Act
    await render(hbs`
      {{sites/site/index/-components/main-content/main-content-page-collection
          --router=router
          --pages=pages}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { query: 'instance' });
  });

  test('should show <PageCollectionItem /> for each page', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/index/-components/main-content/main-content-page-collection/page-collection-item');

    // Act
    await render(hbs`
      {{sites/site/index/-components/main-content/main-content-page-collection
          --router=router
          --pages=pages}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, { router: 'instance', page: 'instance' });
  });

  test('should show empty state when there are no pages', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('pages', []);

    // Act
    await render(hbs`
      {{sites/site/index/-components/main-content/main-content-page-collection
          --router=router
          --pages=pages}}
    `);

    // Assert
    assert.dom('[data-test-main-content-page-collection="empty-state"]').exists();
  });
});
