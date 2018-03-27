import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ce-toast', (hooks) => {
  setupRenderingTest(hooks);

  test('should render yield', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{#ce-toast data-test="host"}}Foo{{/ce-toast}}`);

    // Assert
    assert.dom('[data-test="host"]').hasText('Foo');
  });
});
