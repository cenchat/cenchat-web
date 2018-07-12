import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | site/page/-components/main-content/main-content-comments', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('prioritizedComments', []);
    this.set('onSignInClick', () => {});
  });

  test('should show yield', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{#site/page/-components/main-content/main-content-comments
          --session=session
          --prioritizedComments=prioritizedComments
          --onSignInClick=(action onSignInClick)}}
        <div data-test="foo"></div>
      {{/site/page/-components/main-content/main-content-comments}}
    `);

    // Assert
    assert.dom('[data-test="foo"]').exists();
  });

  test('should show <CommentsHeader />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'site/page/-components/main-content/main-content-comments/comments-header');

    // Act
    await render(hbs`
      {{site/page/-components/main-content/main-content-comments
          --session=session
          --prioritizedComments=prioritizedComments
          --onSignInClick=(action onSignInClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { session: 'instance', onSignInClick: 'function' });
  });

  test('should show <CommentList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-list');

    // Act
    await render(hbs`
      {{site/page/-components/main-content/main-content-comments
          --session=session
          --prioritizedComments=prioritizedComments
          --onSignInClick=(action onSignInClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      prioritizedComments: 'array',
      threadLevel: 'number',
    });
  });
});
