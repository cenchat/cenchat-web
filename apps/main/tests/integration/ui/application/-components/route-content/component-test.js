import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | application/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show navbar when signed in', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert.dom('[data-test-application="navbar"]').exists();
  });

  test('should show navbar when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', false);

    // Act
    await render(hbs`
      {{application/-components/route-content --session=session}}
    `);

    // Assert
    assert.dom('[data-test-application="navbar"]').doesNotExist();
  });
});
