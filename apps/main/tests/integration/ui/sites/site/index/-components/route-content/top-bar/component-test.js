import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/index/-components/route-content/top bar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.findRecord('site', 'site_a'));
  });

  test('should show site name', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/top-bar
          --site=site
          --session=session}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="name"]').hasText('Site A');
  });

  test('should show roles link when a site admin', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/top-bar
          --site=site
          --session=session}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="roles-link"]').exists();
  });

  test('should hide roles link when not a site admin', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', await this.store.findRecord('user', 'user_b'));

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/top-bar
          --site=site
          --session=session}}
    `);

    // Assert
    assert.dom('[data-test-top-bar="roles-link"]').doesNotExist();
  });
});
