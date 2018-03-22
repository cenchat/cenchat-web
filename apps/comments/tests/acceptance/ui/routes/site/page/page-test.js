/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'comments/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | ui/routes/site/page');

test('should create page when it does not exist', async function(assert) {
  assert.expect(1);

  // Act
  await visit('/sites/site_a/pages/page_b?slug=foobar');

  // Assert
  assert.dom('[data-test-comment-item]').exists({ count: 0 });
});

test('should list comments', async function(assert) {
  assert.expect(1);

  // Act
  await visit('/sites/site_a/pages/page_a?slug=foobar');

  // Assert
  assert.dom('[data-test-comment-item]').exists({ count: 2 });
});

test('should show a comment on demand', async function(assert) {
  assert.expect(1);

  // Act
  await visit('/sites/site_a/pages/page_a?comment=comment_c&slug=foobar');

  // Assert
  assert.dom('[data-test-comment-item]').exists({ count: 3 });
});

test('should load more comments', async function(assert) {
  assert.expect(1);

  // Arrange
  await visit('/sites/site_a/pages/page_a?slug=foobar');

  // Act
  await click('[data-test-comment-list="load-more-comments-button"]');

  // Assert
  assert.dom('[data-test-comment-item]').exists({ count: 3 });
});

test('should create comment', async function(assert) {
  assert.expect(1);

  // Arrange
  await visit('/sites/site_a/pages/page_a?slug=foobar');
  await click('[data-test-composer-toolbar="sticker-button"]');
  await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');

  // Act
  await click('[data-test-composer-toolbar="send-button"]');

  // Assert
  assert.dom('[data-test-comment-item]').exists({ count: 3 });
});

test('should create comment with tagged entities', async function(assert) {
  assert.expect(1);

  // Arrange
  await visit('/sites/site_a/pages/page_a?slug=foobar');
  await click('[data-test-composer-toolbar="sticker-button"]');
  await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');
  await click('[data-test-comment-composer-toolbar="tag-entity-button"]');
  await fillIn('[data-test-toolbar-tag-entity-panel="search-field"] input', 'user_c');
  await click('[data-test-tag-entity-panel-item="user_c"] button');

  // Act
  await click('[data-test-composer-toolbar="send-button"]');

  // Assert
  assert.dom('[data-test-tagged-entity-list-item="user_c"]').exists();
});

test('should edit comment', async function(assert) {
  assert.expect(1);

  // Arrange
  const commentItem = '[data-test-comment-item="comment_a"]';
  const editFormContainer = `${commentItem} [data-test-comment-item="edit-form-container"]`;

  await visit('/sites/site_a/pages/page_a?slug=foobar');
  await click('[data-test-page-comments="filter-comments-button"] button');
  await click('[data-test-page-comments="filter-comments-by-all-button"]');
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

test('should edit comment that adds some tagged entities', async function(assert) {
  assert.expect(1);

  // Arrange
  const commentItem = '[data-test-comment-item="comment_a"]';
  const editFormContainer = `${commentItem} [data-test-comment-item="edit-form-container"]`;

  await visit('/sites/site_a/pages/page_a?slug=foobar');
  await click('[data-test-page-comments="filter-comments-button"] button');
  await click('[data-test-page-comments="filter-comments-by-all-button"]');
  await click(`${commentItem} [data-test-item-toolbar="edit-button"]`);
  await click(`${editFormContainer} [data-test-comment-composer-toolbar="tag-entity-button"]`);
  await fillIn(`${editFormContainer} [data-test-toolbar-tag-entity-panel="search-field"] input`, 'user_c');
  await click(`${editFormContainer} [data-test-tag-entity-panel-item="user_c"] button`);

  // Act
  await click(`${editFormContainer} ${'[data-test-composer-toolbar="send-button"]'}`);

  // Assert
  assert
    .dom(`${commentItem} [data-test-tagged-entity-list-item="user_c"]`)
    .exists();
});

test('should delete comment', async function(assert) {
  assert.expect(1);

  // Arrange
  const commentItem = '[data-test-comment-item="comment_a"]';

  await visit('/sites/site_a/pages/page_a?slug=foobar');

  // Act
  await click('[data-test-page-comments="filter-comments-button"] button');
  await click('[data-test-page-comments="filter-comments-by-all-button"]');
  await click(`${commentItem} [data-test-item-toolbar="delete-button"]`);

  // Assert
  assert
    .dom(`${commentItem} [data-test-content-message="deleted-message"]`)
    .exists();
});

test('should list comment replies', async function(assert) {
  assert.expect(1);

  // Arrange
  const commentItem = '[data-test-comment-item="comment_a"]';

  await visit('/sites/site_a/pages/page_a?slug=foobar');

  // Act
  await click('[data-test-page-comments="filter-comments-button"] button');
  await click('[data-test-page-comments="filter-comments-by-all-button"]');
  await click(`${commentItem} [data-test-item-toolbar="reply-button"]`);

  // Assert
  assert.dom(`${commentItem} [data-test-comment-item]`).exists({ count: 2 });
});

test('should load more replies', async function(assert) {
  assert.expect(1);

  // Arrange
  const commentItem = '[data-test-comment-item="comment_a"]';

  await visit('/sites/site_a/pages/page_a?slug=foobar');
  await click('[data-test-page-comments="filter-comments-button"] button');
  await click('[data-test-page-comments="filter-comments-by-all-button"]');
  await click(`${commentItem} [data-test-item-toolbar="reply-button"]`);

  // Act
  await click('[data-test-comment-list="load-more-comments-button"]');

  // Assert
  assert.dom(`${commentItem} [data-test-comment-item]`).exists({ count: 4 });
});

test('should create comment reply', async function(assert) {
  assert.expect(1);

  // Arrange
  const commentItem = '[data-test-comment-item="comment_b"]';

  await visit('/sites/site_a/pages/page_a?slug=foobar');
  await click(`${commentItem} [data-test-item-toolbar="reply-button"]`);
  await click(`${commentItem} [data-test-composer-toolbar="sticker-button"]`);
  await click(`${commentItem} [data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]`);

  // Act
  await click(`${commentItem} [data-test-composer-toolbar="send-button"]`);

  // Assert
  assert.dom(`${commentItem} [data-test-comment-item]`).exists({ count: 2 });
});

test('should edit comment reply', async function(assert) {
  assert.expect(1);

  // Arrange
  const replyItem = '[data-test-comment-item="comment_b"] [data-test-comment-item="comment_c"]';
  const editFormContainer = `${replyItem} [data-test-comment-item="edit-form-container"]`;

  await visit('/sites/site_a/pages/page_a?slug=foobar');
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

test('should delete comment reply', async function(assert) {
  assert.expect(1);

  // Arrange
  const replyItem = '[data-test-comment-item="comment_c"]';

  await visit('/sites/site_a/pages/page_a?slug=foobar');
  await click('[data-test-comment-item="comment_b"] [data-test-item-toolbar="reply-button"]');

  // Act
  await click(`${replyItem} [data-test-item-toolbar="delete-button"]`);

  // Assert
  assert
    .dom(`${replyItem} [data-test-content-message="deleted-message"]`)
    .exists();
});

test('should show notifications', async function(assert) {
  assert.expect(1);

  // Arrange
  await visit('/sites/site_a/pages/page_a?slug=foobar');

  // Act
  await click('[data-test-profile-bar="notification-button"] > button');

  // Assert
  assert.dom('.notification-list-item').exists();
});
