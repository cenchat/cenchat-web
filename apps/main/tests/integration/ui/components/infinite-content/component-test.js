import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | infinite content', (hooks) => {
  setupRenderingTest(hooks);

  test('should show yield', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{#infinite-content}}
        <div data-test-infinite-content="yield"></div>
      {{/infinite-content}}
    `);

    // Assert
    assert.dom('[data-test-infinite-content="yield"]').exists();
  });
});
