import { click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import RSVP from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | ce-button', (hooks) => {
  setupRenderingTest(hooks);

  test('should render yield', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{#ce-button data-test="host"}}Foo{{/ce-button}}`);

    // Assert
    assert.dom('[data-test="host"]').hasText('Foo');
  });

  test('should disable button when clicking it performs a promise', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set(
      'onClick',
      sinon.stub().returns(new RSVP.Promise(() => {})),
    );

    await this.render(hbs`
      {{#ce-button data-test="host" --onClick=(action onClick)}}Foo{{/ce-button}}
    `);

    // Act
    await click('[data-test="host"]');

    // Assert
    assert.dom('[data-test="host"]').hasAttribute('disabled');
  });

  test('should show progress bar button when clicking it performs a promise', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set(
      'onClick',
      sinon.stub().returns(new RSVP.Promise(() => {})),
    );

    await this.render(hbs`
      {{#ce-button data-test="host" --onClick=(action onClick)}}Foo{{/ce-button}}
    `);

    // Act
    await click('[data-test="host"]');

    // Assert
    assert.dom('[data-test="host"]').hasAttribute('performing');
  });
});
