import { click, waitFor } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import RSVP from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | ce-icon-button', (hooks) => {
  setupRenderingTest(hooks);

  test('should render icon when icon is passed in', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-button data-test="host" icon="favorite"}}
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
      {{ce-icon-button data-test="host" image=image}}
    `);

    // Assert
    await waitFor('[data-test="host"] img');
    assert.dom('[data-test="host"] img').hasAttribute('src', this.image);
  });

  test('should bind image alt when image and alt is passed in', async function (assert) {
    assert.expect(1);

    // Arrange
    const cacheBusterRandomString = Math.random().toString(32).slice(2).substr(0, 5);

    this.set('image', `https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e?buster=${cacheBusterRandomString}`);

    // Act
    await this.render(hbs`
      {{ce-icon-button data-test="host" image=image alt="favorite"}}
    `);

    // Assert
    await waitFor('[data-test="host"] img');
    assert.dom('[data-test="host"] img').hasAttribute('alt', 'favorite');
  });

  test('should disable button when clicking it performs a promise', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('onClick', sinon.stub().returns(new RSVP.Promise(() => {})));

    await this.render(hbs`
      {{ce-icon-button
          data-test="host" 
          image="favorite.jpg"
          alt="favorite"
          --onClick=(action onClick)}}
    `);

    // Act
    await click('[data-test="host"]');

    // Assert
    assert.dom('[data-test="host"]').hasAttribute('disabled');
  });

  test('should show progress bar button when clicking it performs a promise', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('onClick', sinon.stub().returns(new RSVP.Promise(() => {})));

    await this.render(hbs`
      {{ce-icon-button
          data-test="host" 
          image="favorite.jpg"
          alt="favorite"
          --onClick=(action onClick)}}
    `);

    // Act
    await click('[data-test="host"]');

    // Assert
    assert.dom('[data-test="host"]').hasAttribute('performing');
  });
});
