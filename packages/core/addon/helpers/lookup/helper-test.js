import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import Service from '@ember/service';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | lookup', function (hooks) {
  setupRenderingTest(hooks);

  test('should resolve with what was looked up', async function (assert) {
    assert.expect(1);

    // Arrange
    const testService = Service.extend({ name: 'foo' });

    this.owner.register('service:test-service', testService);

    // Act
    await render(hbs`
      {{#let (lookup 'service:test-service') as |testService|}}
        <div data-test="service">{{testService.name}}</div>
      {{/let}}
    `);

    // Assert
    assert.dom('[data-test="service"]').hasText('foo');
  });
});
