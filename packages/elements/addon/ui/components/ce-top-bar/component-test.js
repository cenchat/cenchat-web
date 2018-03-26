import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ce-top-bar', (hooks) => {
  setupRenderingTest(hooks);

  test('should render yield inside <ce-top-bar-row> when not multi-row', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{#ce-top-bar data-test="host"}}Foo{{/ce-top-bar}}`);

    // Assert
    assert.dom('[data-test="host"] .ce-top-bar-row').hasText('Foo');
  });

  test('should render yield without <ce-top-bar-row> when multi-row', async function (assert) {
    assert.expect(2);

    // Act
    await this.render(hbs`
      {{#ce-top-bar data-test="host" multi-row=true}}Foo{{/ce-top-bar}}
    `);

    // Assert
    assert.dom('.ce-top-bar-row').doesNotExist();
    assert.dom('[data-test="host"]').hasText('Foo');
  });
});
