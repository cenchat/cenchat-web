import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent, stubService } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/site/index/-components/route-content/page collection', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const site = await run(() => {
      return this.get('store').findRecord('site', 'site_a');
    });
    const pages = await site.get('pages');

    this.set('router', stubService(this, 'router'));
    this.set('pages', pages);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <InfiniteContent />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'infinite-content');

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/page-collection
          --router=router
          --pages=pages}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { 'query': 'instance' });
  });

  test('should show <PageCollectionItem /> for each page', async function(assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/site/index/-components/route-content/page-collection/page-collection-item');

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/page-collection
          --router=router
          --pages=pages}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      'router': 'instance',
      'page': 'instance',
    });
  });

  test('should show empty state when there are no pages', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('pages', []);

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/page-collection
          --router=router
          --pages=pages}}
    `);

    // Assert
    assert.dom('[data-test-page-collection="empty-state"]').exists();
  });
});
