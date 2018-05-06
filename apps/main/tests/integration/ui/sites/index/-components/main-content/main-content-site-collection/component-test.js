import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/index/-components/main-content/main-content-site-collection', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('sites', await this.get('session.model.sitesAsAdmin'));
  });

  test('should show <InfiniteContent />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'infinite-content');

    // Act
    await render(hbs`
      {{sites/index/-components/main-content/main-content-site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { query: 'instance' });
  });

  test('should show <SiteCollectionItem /> for every site', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'sites/index/-components/main-content/main-content-site-collection/site-collection-item');

    // Act
    await render(hbs`
      {{sites/index/-components/main-content/main-content-site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.ok(spy.called);
    assert.deepEqual(spy.componentArgsType, {
      router: 'instance',
      site: 'instance',
    });
  });

  test('should show empty state when there are no sites at all', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('sites', []);

    // Act
    await render(hbs`
      {{sites/index/-components/main-content/main-content-site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.dom('[data-test-main-content-site-collection="empty-state"]').exists();
  });

  test('should hide empty state when there is at least 1 site', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/index/-components/main-content/main-content-site-collection
          --router=router
          --sites=sites}}
    `);

    // Assert
    assert.dom('[data-test-main-content-site-collection="empty-state"]').doesNotExist();
  });
});
