import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ce-image', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const cacheBusterRandomString = Math.random().toString(32).slice(2).substr(0, 5);

    this.set('src', `https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e?buster=${cacheBusterRandomString}`);
  });

  test('should show image when it is finished loading', async function (assert) {
    assert.expect(2);

    // Act
    await this.render(hbs`{{ce-image src=src}}`);

    // Assert
    await waitFor('img');
    assert.dom('img').hasClass('ce-image__actual-image');
    assert.dom('img').hasAttribute('src', this.src);
  });

  test('should hide image when it is not finished loading', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`{{ce-image src=src}}`);

    // Assert
    assert.dom('img').doesNotExist();
  });
});
