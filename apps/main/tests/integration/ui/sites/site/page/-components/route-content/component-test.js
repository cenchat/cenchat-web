import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/site/page/-components/route content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const page = await run(() => {
      return this.get('store').findRecord('page', 'site_a__page_a');
    });

    this.set('page', page);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <top-bar>', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/page/-components/route-content/top-bar');

    // Act
    await render(hbs`
      {{sites/site/page/-components/route-content --page=page}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { 'page': 'instance' });
  });
});
