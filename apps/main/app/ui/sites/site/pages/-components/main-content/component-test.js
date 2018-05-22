import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const site = await this.store.findRecord('site', 'site_a');

    this.set('pages', await site.get('pages'));
  });

  test('should show <MainContentPageCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/pages/-components/main-content/main-content-page-collection');

    // Act
    await render(hbs`
      {{sites/site/pages/-components/main-content/main-content-page-collection --pages=pages}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { pages: 'instance' });
  });
});
