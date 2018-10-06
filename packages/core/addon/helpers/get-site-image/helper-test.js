import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | get-site-image', function (hooks) {
  setupRenderingTest(hooks);

  test('should return site image when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site', { imageUrl: 'site_a.jpg' });

    // Act
    await render(hbs`{{get-site-image site}}`);

    // Assert
    assert.dom().hasText('site_a.jpg');
  });

  test('should return default image when site image is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site', { imageUrl: null });

    // Act
    await render(hbs`{{get-site-image site}}`);

    // Assert
    assert.dom().hasText('https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
  });
});
