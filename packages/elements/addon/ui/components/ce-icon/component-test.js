import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ce-icon', (hooks) => {
  setupRenderingTest(hooks);

  test('should render yield', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{#ce-icon data-test="host"}}Foo{{/ce-icon}}`);

    // Assert
    assert.dom('[data-test="host"]').hasText('Foo');
  });
});
