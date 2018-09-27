import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | get-user-photo', function (hooks) {
  setupRenderingTest(hooks);

  test('should return user photo when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user', { photoUrl: 'user_a.jpg' });

    // Act
    await render(hbs`{{get-user-photo user}}`);

    // Assert
    assert.dom().hasText('user_a.jpg');
  });

  test('should return default photo when user photo is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user', { photoUrl: null });

    // Act
    await render(hbs`{{get-user-photo user}}`);

    // Assert
    assert.dom().hasText('https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
  });
});
