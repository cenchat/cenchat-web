import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ce-icon-link-button', function(hooks) {
  setupRenderingTest(hooks);

  test('should render icon when icon is passed in', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-link-button data-test="host" icon="favorite"}}
    `);

    // Assert
    assert.dom('[data-test="host"] i').hasText('favorite');
  });

  test('should render image when image is passed in', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-link-button data-test="host" image="favorite.jpg"}}
    `);

    // Assert
    assert.dom('[data-test="host"] img').hasAttribute('src', 'favorite.jpg');
  });

  test('should bind image alt when image and alt is passed in', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-link-button data-test="host" image="favorite.jpg" alt="favorite"}}
    `);

    // Assert
    assert.dom('[data-test="host"] img').hasAttribute('alt', 'favorite');
  });
});
