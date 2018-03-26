import { click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import RSVP from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | ce-form', (hooks) => {
  setupRenderingTest(hooks);

  test('should set submit button to progressing state when submitting form', async function (assert) {
    assert.expect(2);

    // Arrange
    this.set('onSubmit', () => new RSVP.Promise(() => {}));

    await this.render(hbs`
      {{#ce-form --onSubmit=(action onSubmit)}}
        <input data-test="form-submit" type="submit">
      {{/ce-form}}
    `);

    // Act
    await click('[data-test="form-submit"]');

    // Assert
    assert.dom('[data-test="form-submit"]').hasAttribute('performing');
    assert.dom('[data-test="form-submit"]').hasAttribute('disabled');
  });

  test('should unset submit button from progressing state when submitting form completes', async function (assert) {
    assert.expect(2);

    // Arrange
    this.set('onSubmit', () => new RSVP.Promise((resolve) => {
      resolve();
    }));

    await this.render(hbs`
      {{#ce-form --onSubmit=(action onSubmit)}}
        <input data-test="form-submit" type="submit">
      {{/ce-form}}
    `);

    // Act
    await click('[data-test="form-submit"]');

    // Assert
    assert.dom('[data-test="form-submit"]').doesNotHaveAttribute('performing');
    assert.dom('[data-test="form-submit"]').doesNotHaveAttribute('disabled');
  });

  test('should fire an external action when submitting form', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onSubmit', stub);

    await this.render(hbs`
      {{#ce-form --onSubmit=(action onSubmit)}}
        <input data-test="form-submit" type="submit">
      {{/ce-form}}
    `);

    // Act
    await click('[data-test="form-submit"]');

    // Assert
    assert.ok(stub.calledOnce);
  });
});
