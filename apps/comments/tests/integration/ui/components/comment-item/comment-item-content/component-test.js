import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-item/comment item content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const comment = await run(() => this.get('store').findRecord('comment', 'comment_b'));

    this.set('comment', comment);
    this.set('isQuoteVisible', false);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <ContentQuote /> when requested to be visible', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isQuoteVisible', true);

    const spy = spyComponent(this, 'comment-item/comment-item-content/content-quote');

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { comment: 'instance' });
  });

  test('should hide <ContentQuote /> when requested to be hidden', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-content/content-quote');

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <ContentHeader>', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-content/content-header');

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { comment: 'instance' });
  });

  test('should show <ContentMessage />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-content/content-message');

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { comment: 'instance' });
  });

  test('should show <ContentTaggedEntityList /> when there is a tagged user', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.taggedEntities', { user_b: 'user' });

    const spy = spyComponent(this, 'comment-item/comment-item-content/content-tagged-entity-list');

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { entities: 'array' });
  });

  test('should hide <ContentTaggedEntityList /> when there are no tagged users', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-content/content-tagged-entity-list');

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show ask me anything sticker when comment has ask me anything flagged to true', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isAskMeAnything', true);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert
      .dom('[data-test-content-item-content="ask-me-anything-image"]')
      .exists();
  });

  test('should hide ask me anything sticker when comment has ask me anything flagged to false', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isAskMeAnything', false);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert
      .dom('[data-test-content-item-content="ask-me-anything-image"]')
      .doesNotExist();
  });
});
