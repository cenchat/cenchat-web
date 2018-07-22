import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ani-each', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('items', [1, 2, 3, 4, 5]);
  });

  test('should list items', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{#ani-each items as |item index|}}
        <div data-test="{{item}}">{{item}} | {{index}}</div>
      {{/ani-each}}
    `);

    // Assert
    assert.dom('[data-test]').exists({ count: 5 });
    assert.dom('[data-test="1"]').hasText('1 | 0');
  });

  test('should add animation class to every item', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`
      {{#ani-each items as |item|}}
        <div data-test="{{item}}">{{item}}</div>
      {{/ani-each}}
    `);

    // Assert
    assert.dom('[data-test="1"]').hasClass('ce-fade-in');
    assert.dom('[data-test="2"]').hasClass('ce-fade-in');
  });

  test('should show else block when items is empty', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('items', []);

    // Act
    await render(hbs`
      {{#ani-each items as |item index|}}
        <div data-test="{{item}}">{{item}} | {{index}}</div>
      {{else}}
        <div data-test="empty">Empty</div>
      {{/ani-each}}
    `);

    // Assert
    assert.dom('[data-test="empty"]').exists();
  });

  test('should show else block when items is not iteratable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('items', null);

    // Act
    await render(hbs`
      {{#ani-each items as |item index|}}
        <div data-test="{{item}}">{{item}} | {{index}}</div>
      {{else}}
        <div data-test="empty">Empty</div>
      {{/ani-each}}
    `);

    // Assert
    assert.dom('[data-test="empty"]').exists();
  });
});
