import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/site/index/-components/route-content/top bar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const site = await run(() => {
      return this.get('store').findRecord('site', 'site_a');
    });

    this.set('site', site);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show site name', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{sites/site/index/-components/route-content/top-bar --site=site}}`);

    // Assert
    assert
      .dom('[data-test-top-bar="name"]')
      .hasText('Site A');
  });
});
