import { click, waitFor, waitUntil } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | ce-dropdown-button', (hooks) => {
  setupRenderingTest(hooks);

  test('should show yield', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" text="Foo"}}
        <li data-test="foo">Foo</li>
      {{/ce-dropdown-button}}
    `);

    // Assert
    assert.dom('[data-test="foo"]').exists();
  });

  test('should show text', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" text="Foo"}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    // Assert
    assert.dom('[data-test="host"] button').hasText('Foo');
  });

  test('should show icon', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" icon="favorite"}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    // Assert
    assert.dom('[data-test="host"] button').hasText('favorite');
  });

  test('should show image', async function (assert) {
    assert.expect(1);

    // Arrange
    const cacheBusterRandomString = Math.random().toString(32).slice(2).substr(0, 5);

    this.set('image', `https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e?buster=${cacheBusterRandomString}`);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" image=image}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    // Assert
    await waitFor('[data-test="host"] img', { timeout: 5000 });
    assert.dom('[data-test="host"] img').hasAttribute('src', this.image);
  });

  test('should generate ID for button', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" text="Foo"}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    // Assert
    assert.dom('[data-test="host"] button').hasAttribute('id');
  });

  test('should generate aria-labelledby for list', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" text="Foo"}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    // Assert
    assert.dom('[data-test="host"] ul').hasAttribute('aria-labelledby');
  });

  test('should open menu when clicking button', async function (assert) {
    assert.expect(2);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" text="Foo"}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    await click('[data-test="host"] button');

    // Assert
    assert.dom('[data-test="host"] button').hasAttribute(
      'aria-expanded',
      'true',
    );
    assert.dom('[data-test="host"] ul').hasClass('expanded');
  });

  test('should hide menu when clicking backdrop if dropdown is expanded', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      <div data-test="container">
        {{#ce-dropdown-button data-test="host" text="Foo"}}
          <li>
            <a>Foo</a>
          </li>
          <li>
            <a>Bar</a>
          </li>
        {{/ce-dropdown-button}}
      </div>
    `);

    await click('[data-test="host"] button');
    await click('[data-test="host"] .backdrop');

    await waitUntil(() => this.element.querySelector('[data-test="host"] button')
      .getAttribute('aria-expanded') === 'false');

    // Assert
    assert.dom('[data-test="host"] ul').hasClass('compressed');
  });

  test('should fire an external action when clicking button', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onClick', stub);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button
          data-test="host"
          text="Foo"
          --onClick=(action onClick)}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    await click('[data-test="host"] button');

    // Assert
    assert.ok(stub.calledOnce);
  });

  test('should set lr as default position when position is not available', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{#ce-dropdown-button data-test="host" text="Foo"}}
        <li>
          <a>Foo</a>
        </li>
        <li>
          <a>Bar</a>
        </li>
      {{/ce-dropdown-button}}
    `);

    // Assert
    assert.dom('[data-test="host"]').hasAttribute('position', 'lr');
  });
});
