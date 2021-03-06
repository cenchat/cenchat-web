import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/manage/-components/top-bar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.findRecord('site', 'site_a'));
  });

  test('should show site name', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/manage/-components/top-bar --site=site}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="site-name"]').hasText('Manage (Site A)');
  });
});
