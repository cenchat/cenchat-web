import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | get-user-display-name', function (hooks) {
  setupRenderingTest(hooks);

  test('should return user display name when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user', { displayName: 'User A' });

    // Act
    await render(hbs`{{get-user-display-name user}}`);

    // Assert
    assert.dom().hasText('User A');
  });

  test('should return default display name when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user', { displayName: null });

    // Act
    await render(hbs`{{get-user-display-name user}}`);

    // Assert
    assert.dom().hasText('Anonymous');
  });
});
