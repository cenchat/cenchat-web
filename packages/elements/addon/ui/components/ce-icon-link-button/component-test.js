import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ce-icon-link-button', (hooks) => {
  setupRenderingTest(hooks);

  test('should render icon when icon is passed in', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-link-button data-test="host" icon="favorite"}}
    `);

    // Assert
    assert.dom('[data-test="host"] i').hasText('favorite');
  });

  test('should render image when image is passed in', async function (assert) {
    assert.expect(1);

    // Arrange
    const cacheBusterRandomString = Math.random().toString(32).slice(2).substr(0, 5);

    this.set('image', `https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e?buster=${cacheBusterRandomString}`);

    // Act
    await this.render(hbs`
      {{ce-icon-link-button data-test="host" image=image}}
    `);

    // Assert
    await waitFor('[data-test="host"] img', { timeout: 5000 });
    assert.dom('[data-test="host"] img').hasAttribute('src', this.image);
  });

  test('should bind image alt when image and alt is passed in', async function (assert) {
    assert.expect(1);

    // Arrange
    const cacheBusterRandomString = Math.random().toString(32).slice(2).substr(0, 5);

    this.set('image', `https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e?buster=${cacheBusterRandomString}`);

    // Act
    await this.render(hbs`
      {{ce-icon-link-button data-test="host" image=image alt="favorite"}}
    `);

    // Assert
    await waitFor('[data-test="host"] img', { timeout: 5000 });
    assert.dom('[data-test="host"] img').hasAttribute('alt', 'favorite');
  });
});
