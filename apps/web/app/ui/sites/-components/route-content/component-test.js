import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('sites', await this.store.getAll('site'));
  });

  test('should show <SiteCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/-components/route-content/site-collection');

    // Act
    await render(hbs`{{sites/-components/route-content --sites=sites}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { sites: 'array' });
  });
});
