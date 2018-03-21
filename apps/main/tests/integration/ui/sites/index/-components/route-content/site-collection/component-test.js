import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent, stubService } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/index/-components/route-content/site collection', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const sites = await this.get('session.model.sitesAsAdmin');

    this.set('router', stubService(this, 'router'));
    this.set('sites', sites);
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
      {{sites/index/-components/route-content/site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { 'query': 'instance' });
  });

  test('should show <SiteCollectionItem /> for every site', async function(assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/index/-components/route-content/site-collection/site-collection-item');

    // Act
    await render(hbs`
      {{sites/index/-components/route-content/site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      'router': 'instance',
      'site': 'instance',
    });
  });

  test('should show empty state when there are no sites at all', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('sites', []);

    // Act
    await render(hbs`
      {{sites/index/-components/route-content/site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.dom('[data-test-site-collection="empty-state"]').exists();
  });

  test('should hide empty state when there is at least 1 site', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/index/-components/route-content/site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.dom('[data-test-site-collection="empty-state"]').doesNotExist();
  });
});
