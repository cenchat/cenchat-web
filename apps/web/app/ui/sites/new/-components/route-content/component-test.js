import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/new/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onSiteFormSubmit', () => false);
  });

  test('should show <SiteForm />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/new/-components/route-content/site-form');

    // Act
    await render(hbs`
      {{sites/new/-components/route-content --onSiteFormSubmit=(action onSiteFormSubmit)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { onSiteFormSubmit: 'function' });
  });
});
