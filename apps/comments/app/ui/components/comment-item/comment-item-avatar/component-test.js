import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-item/comment-item-avatar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_b');

    comment.set('isFromFollowing', false);
    this.set('comment', comment);
    this.set('onToggleQuoteClick', () => {});
  });

  test('should show author image', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-avatar
          --comment=comment
          --onToggleQuoteClick=(action onToggleQuoteClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-avatar="author-image"]').hasAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
  });

  test('should show anonymous author image when author is not available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.author', null);

    // Act
    await render(hbs`
      {{comment-item/comment-item-avatar
          --comment=comment
          --onToggleQuoteClick=(action onToggleQuoteClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-avatar="anonymous-author-image"]').exists();
  });

  test('should show following badge when author is a following', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isFromFollowing', true);

    // Act
    await render(hbs`
      {{comment-item/comment-item-avatar
          --comment=comment
          --onToggleQuoteClick=(action onToggleQuoteClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-avatar="following-badge"]').exists();
  });

  test('should hide following badge when author isn\'t a following', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-avatar
          --comment=comment
          --onToggleQuoteClick=(action onToggleQuoteClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-avatar="following-badge"]').doesNotExist();
  });

  test('should show show quote button when available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-avatar
          --comment=comment
          --onToggleQuoteClick=(action onToggleQuoteClick)}}
    `);

    // Assert
    assert
      .dom('[data-test-item-avatar="toggle-quote-button"] img')
      .hasAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
  });

  test('should hide show quote button when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    const comment = await this.store.findRecord('comment', 'comment_a', {
      adapterOptions: { path: 'comments/site_a/page_a' },
    });

    this.set('comment', comment);

    // Act
    await render(hbs`
      {{comment-item/comment-item-avatar
          --comment=comment
          --onToggleQuoteClick=(action onToggleQuoteClick)}}
    `);

    // Assert
    assert.dom('[data-test-item-avatar="toggle-quote-button"]').doesNotExist();
  });

  test('should fire an external action when clicking toggle quote', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onToggleQuoteClick');

    await render(hbs`
      {{comment-item/comment-item-avatar
          --comment=comment
          --onToggleQuoteClick=(action onToggleQuoteClick)}}
    `);

    // Act
    await click('[data-test-item-avatar="toggle-quote-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
