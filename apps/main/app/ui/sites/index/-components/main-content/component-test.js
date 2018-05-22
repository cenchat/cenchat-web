import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/index/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('sitesAsAdmin', this.get('session.model.sitesAsAdmin'));
  });

  test('should show <MainContentSiteCollection /> for sites as admin', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/index/-components/main-content/main-content-site-collection');

    // Act
    await render(hbs`
      {{sites/index/-components/main-content
          --router=router
          --session=session
          --sitesAsAdmin=sitesAsAdmin}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      router: 'instance',
      sites: 'instance',
    });
  });
});
