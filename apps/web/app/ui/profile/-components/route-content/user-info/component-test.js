import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | profile/-components/route-content/user-info', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.store.get('user', 'user_c');

    this.set('user', user);
  });

  test('should show user photo', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{profile/-components/route-content/user-info --user=user}}
    `);

    // Assert
    assert.dom('[data-test-user-info="photo"]').hasAttribute(
      'src',
      'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114',
    );
  });

  test('should show short bio when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.shortBio', 'Foo');

    await render(hbs`
      {{profile/-components/route-content/user-info --user=user}}
    `);

    // Assert
    assert.dom('[data-test-user-info="short-bio"]').hasText('Foo');
  });

  test('should hide short bio when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.shortBio', null);

    await render(hbs`
      {{profile/-components/route-content/user-info --user=user}}
    `);

    // Assert
    assert.dom('[data-test-user-info="short-bio"]').doesNotExist();
  });

  test('should show username when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.displayUsername', 'Foo');
    this.set('user.username', 'foo');

    await render(hbs`
      {{profile/-components/route-content/user-info --user=user}}
    `);

    // Assert
    assert.dom('[data-test-user-info="username"]').hasText('@Foo');
  });

  test('should hide username when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.displayUsername', null);
    this.set('user.username', null);

    await render(hbs`
      {{profile/-components/route-content/user-info --user=user}}
    `);

    // Assert
    assert.dom('[data-test-user-info="username"]').doesNotExist();
  });
});
