import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/site/page/-components/route-content/top bar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const page = await run(() => this.get('store').findRecord('page', 'site_a__page_a'));

    this.set('page', page);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show page title', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`{{sites/site/page/-components/route-content/top-bar --page=page}}`);

    // Assert
    assert
      .dom('[data-test-top-bar="title"]')
      .hasText('Page A Title');
  });
});
