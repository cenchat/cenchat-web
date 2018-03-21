import { click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import RSVP from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | ce-icon-button', function(hooks) {
  setupRenderingTest(hooks);

  test('should render icon when icon is passed in', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-button data-test="host" icon="favorite"}}
    `);

    // Assert
    assert.dom('[data-test="host"] i').hasText('favorite');
  });

  test('should render image when image is passed in', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-button data-test="host" image="favorite.jpg"}}
    `);

    // Assert
    assert.dom('[data-test="host"] img').hasAttribute('src', 'favorite.jpg');
  });

  test('should bind image alt when image and alt is passed in', async function(assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      {{ce-icon-button data-test="host" image="favorite.jpg" alt="favorite"}}
    `);

    // Assert
    assert.dom('[data-test="host"] img').hasAttribute('alt', 'favorite');
  });

  test('should disable button when clicking it performs a promise', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('onClick', sinon.stub().returns(new RSVP.Promise((resolve) => {})));

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

  test('should show progress bar button when clicking it performs a promise', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('onClick', sinon.stub().returns(new RSVP.Promise((resolve) => {})));

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
