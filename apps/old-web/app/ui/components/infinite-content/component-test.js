import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest, setupTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | infinite-content', (hooks) => {
  setupRenderingTest(hooks);

  test('should show yield', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('query', []);

    // Act
    await render(hbs`
      {{#infinite-content --query=query}}
        <div data-test-infinite-content="yield"></div>
      {{/infinite-content}}
    `);

    // Assert
    assert.dom('[data-test-infinite-content="yield"]').exists();
  });
});


module('Unit | Component | infinite-content', (hooks) => {
  setupTest(hooks);

  test('nothing to test so far', (assert) => {
    assert.ok(true);
  });
});
