import { fillIn } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | ce-field', function(hooks) {
  setupRenderingTest(hooks);

  test('should show label', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{ce-field data-test="host" type="text" label="Foo"}}`);

    // Assert
    assert.dom('[data-test="host"] div:first-of-type').hasText('Foo');
  });

  test('should show input field when type is neither multi-text or select', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{ce-field data-test="host" type="text" label="Foo"}}`);

    // Assert
    assert.dom('[data-test="host"] input').exists();
  });

  test('should fire an external action with the filled in value when input is valid', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onInput', stub);

    await this.render(hbs`
      {{ce-field
          data-test="host"
          type="text"
          label="Foo"
          --onInput=(action onInput)}}
    `);

    // Act
    await fillIn('[data-test="host"] input', 'Foo');

    // Assert
    assert.ok(stub.calledWith(sinon.match.has('value', 'Foo')));
  });

  test('should fire an external action with a null value when input is invalid', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onInput', stub);

    await this.render(hbs`
      {{ce-field
          data-test="host"
          type="text"
          title="Letters only"
          pattern="[A-Za-z]*"
          label="Foo"
          --onInput=(action onInput)}}
    `);

    // Act
    await fillIn('[data-test="host"] input', '123');

    // Assert
    assert.ok(stub.calledWith(sinon.match.has('value', null)));
  });

  test('should show textarea field when type is multi-text', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{ce-field data-test="host" type="multi-text" label="Foo"}}`);

    // Assert
    assert.dom('[data-test="host"] textarea').exists();
  });

  test('should fire an external action when inputting textarea field', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onInput', stub);

    await this.render(hbs`
      {{ce-field
          data-test="host"
          type="multi-text"
          label="Foo"
          --onInput=(action onInput)}}
    `);

    // Act
    await fillIn('[data-test="host"] textarea', 'Foo');

    // Assert
    assert.ok(stub.calledWith(sinon.match.has('value', 'Foo')));
  });

  test('should show select field when type is select', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{ce-field data-test="host" type="select" label="Foo"}}`);

    // Assert
    assert.dom('[data-test="host"] select').exists();
  });

  test('should fire an external action when changing select field', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onChange', stub);

    await this.render(hbs`
      {{#ce-field
          data-test="host"
          type="select"
          label="Foo"
          --onChange=(action onChange)}}
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      {{/ce-field}}
    `);

    // Act
    await fillIn('[data-test="host"] select', 'Female');

    // Assert
    assert.ok(stub.calledWith(sinon.match.has('value', 'Female')));
  });

  test('should show yield for select field type', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{#ce-field data-test="host" type="select" label="Foo"}}
        <option data-test="option"></option>
      {{/ce-field}}
    `);

    // Assert
    assert.dom('[data-test="host"] option').exists();
  });

  test('should show feedback when input is invalid', async function(assert) {
    assert.expect(1);

    // Arrange
    await this.render(hbs`
      {{ce-field data-test="host" type="number" min="0" label="Foo"}}
    `);

    // Act
    await fillIn('[data-test="host"] input', '-1');

    // Assert
    assert.dom('[data-test="host"] [role="alert"]').exists();
  });

  test('should show title as feedback when input pattern is invalid', async function(assert) {
    assert.expect(1);

    // Arrange
    await this.render(hbs`
      {{ce-field
          data-test="host"
          type="text"
          title="Letters only"
          pattern="[A-Za-z]*"
          label="Foo"}}
    `);

    // Act
    await fillIn('[data-test="host"] input', '123');

    // Assert
    assert.dom('[data-test="host"] [role="alert"]').hasText('Letters only');
  });
});
