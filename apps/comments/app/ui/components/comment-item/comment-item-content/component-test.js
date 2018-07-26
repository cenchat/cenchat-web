import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | comment-item/comment-item-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_b');

    this.set('comment', comment);
    this.set('isQuoteVisible', false);
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
    this.set('comment.taggedEntity', { user_b: 'user' });

    const spy = spyComponent(this, 'comment-item/comment-item-content/content-tagged-entity-list');

    // Act
    await render(hbs`
      {{comment-item/comment-item-content
          --comment=comment
          --isQuoteVisible=isQuoteVisible}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { entities: 'instance' });
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
});
