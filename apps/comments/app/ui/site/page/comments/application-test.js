import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | site/page/comments', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should list comments', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');

    // Assert
    assert.dom('[data-test-comment-item]').exists({ count: 2 });
  });

  test('should load more comments', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');

    // Act
    await click('[data-test-comment-list="load-more-comments-button"]');

    // Assert
    assert.dom('[data-test-comment-item]').exists({ count: 3 });
  });

  test('should create comment', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');
    await click('[data-test-composer-toolbar="sticker-button"]');
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');

    // Act
    await click('[data-test-composer-toolbar="send-button"]');

    // Assert
    assert.dom('[data-test-comment-item]').exists({ count: 3 });
  });

  test('should create comment with tagged entities queried using username', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');
    await click('[data-test-composer-toolbar="sticker-button"]');
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');
    await click('[data-test-comment-composer-toolbar="tag-entity-button"]');
    await fillIn('[data-test-toolbar-tag-entity-panel="search-field"] input', '@user_c');
    await click('[data-test-tag-entity-panel-item="user_c"] button');

    // Act
    await click('[data-test-composer-toolbar="send-button"]');

    // Assert
    assert.dom('[data-test-tagged-entity-list-item="user_c"]').exists();
  });

  test('should create comment with tagged entities queried using name', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');
    await click('[data-test-composer-toolbar="sticker-button"]');
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');
    await click('[data-test-comment-composer-toolbar="tag-entity-button"]');
    await fillIn('[data-test-toolbar-tag-entity-panel="search-field"] input', 'user b');
    await click('[data-test-tag-entity-panel-item="user_b"] button');

    // Act
    await click('[data-test-composer-toolbar="send-button"]');

    // Assert
    assert.dom('[data-test-tagged-entity-list-item="user_b"]').exists();
  });

  test('should edit comment', async function (assert) {
    assert.expect(1);

    // Arrange
    const commentItem = '[data-test-comment-item="comment_a"]';
    const editFormContainer = `${commentItem} [data-test-comment-item="edit-form-container"]`;

    await visit('/sites/site_a/pages/page_a/comments?slug=foobar');
    await click(`${commentItem} [data-test-item-toolbar="edit-button"]`);
    await click(`${editFormContainer} [data-test-composer-toolbar="sticker-button"]`);
    await click(`${editFormContainer} [data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]`);

    // Act
    await click(`${editFormContainer} ${'[data-test-composer-toolbar="send-button"]'}`);

    // Assert
    assert
      .dom(`${commentItem} [data-test-content-message="attachment-image"]`)
      .exists({ count: 3 });
  });

  test('should edit comment that adds some tagged entities', async function (assert) {
    assert.expect(1);

    // Arrange
    const commentItem = '[data-test-comment-item="comment_a"]';
    const editFormContainer = `${commentItem} [data-test-comment-item="edit-form-container"]`;

    await visit('/sites/site_a/pages/page_a/comments?slug=foobar');
    await click(`${commentItem} [data-test-item-toolbar="edit-button"]`);
    await click(`${editFormContainer} [data-test-comment-composer-toolbar="tag-entity-button"]`);
    await fillIn(`${editFormContainer} [data-test-toolbar-tag-entity-panel="search-field"] input`, '@user_c');
    await click(`${editFormContainer} [data-test-tag-entity-panel-item="user_c"] button`);

    // Act
    await click(`${editFormContainer} ${'[data-test-composer-toolbar="send-button"]'}`);

    // Assert
    assert
      .dom(`${commentItem} [data-test-tagged-entity-list-item="user_c"]`)
      .exists();
  });

  test('should delete comment', async function (assert) {
    assert.expect(1);

    // Arrange
    const commentItem = '[data-test-comment-item="comment_a"]';

    await visit('/sites/site_a/pages/page_a/comments?slug=foobar');

    // Act
    await click(`${commentItem} [data-test-item-toolbar="delete-button"]`);

    // Assert
    assert
      .dom(`${commentItem} [data-test-content-message="deleted-message"]`)
      .exists();
  });

  test('should list comment replies', async function (assert) {
    assert.expect(1);

    // Arrange
    const commentItem = '[data-test-comment-item="comment_a"]';

    await visit('/sites/site_a/pages/page_a/comments?slug=foobar');

    // Act
    await click(`${commentItem} [data-test-item-toolbar="reply-button"]`);

    // Assert
    assert.dom(`${commentItem} [data-test-comment-item]`).exists({ count: 2 });
  });

  test('should load more replies', async function (assert) {
    assert.expect(1);

    // Arrange
    const commentItem = '[data-test-comment-item="comment_a"]';

    await visit('/sites/site_a/pages/page_a/comments?slug=foobar');
    await click(`${commentItem} [data-test-item-toolbar="reply-button"]`);

    // Act
    await click('[data-test-comment-list="load-more-comments-button"]');

    // Assert
    assert.dom(`${commentItem} [data-test-comment-item]`).exists({ count: 5 });
  });

  test('should create comment reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const commentItem = '[data-test-comment-item="comment_b"]';

    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');
    await click(`${commentItem} [data-test-item-toolbar="reply-button"]`);
    await click(`${commentItem} [data-test-composer-toolbar="sticker-button"]`);
    await click(`${commentItem} [data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]`);

    // Act
    await click(`${commentItem} [data-test-composer-toolbar="send-button"]`);

    // Assert
    assert.dom(`${commentItem} [data-test-comment-item]`).exists({ count: 2 });
  });

  test('should edit comment reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const replyItem = '[data-test-comment-item="comment_b"] [data-test-comment-item="comment_c"]';
    const editFormContainer = `${replyItem} [data-test-comment-item="edit-form-container"]`;

    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');
    await click('[data-test-comment-item="comment_b"] [data-test-item-toolbar="reply-button"]');
    await click(`${replyItem} [data-test-item-toolbar="edit-button"]`);
    await click(`${editFormContainer} [data-test-composer-toolbar="sticker-button"]`);
    await click(`${editFormContainer} [data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]`);

    // Act
    await click(`${editFormContainer} ${'[data-test-composer-toolbar="send-button"]'}`);

    // Assert
    assert
      .dom(`${replyItem} [data-test-content-message="attachment-image"]`)
      .exists({ count: 3 });
  });

  test('should delete comment reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const replyItem = '[data-test-comment-item="comment_c"]';

    await visit('/sites/site_a/pages/page_a/comments?filter=relevance&slug=foobar');
    await click('[data-test-comment-item="comment_b"] [data-test-item-toolbar="reply-button"]');

    // Act
    await click(`${replyItem} [data-test-item-toolbar="delete-button"]`);

    // Assert
    assert
      .dom(`${replyItem} [data-test-content-message="deleted-message"]`)
      .exists();
  });
});
