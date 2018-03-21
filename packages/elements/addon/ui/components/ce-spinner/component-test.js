import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ce-spinner', function(hooks) {
  setupRenderingTest(hooks);

  test('should render', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{ce-spinner data-test="host"}}`);

    // Assert
    assert.dom('[data-test="host"]').exists();
  });
});
