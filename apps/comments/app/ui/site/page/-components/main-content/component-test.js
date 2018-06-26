import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | site/page/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('page', await this.store.findRecord('page', 'site_a__page_a'));
    this.set('filterCommentsBy', 'all');
    this.set('onFilterCommentsClick', () => {});
  });

  test('should show <ProfileBar /> when signed in', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile-bar');

    // Act
    await render(hbs`
      {{site/page/-components/main-content
          --session=session
          --page=page
          --filterCommentsBy=filterCommentsBy
          --onFilterCommentsClick=(action onFilterCommentsClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      page: 'instance',
      isCommentComposerVisible: 'boolean',
      headerText: 'string',
      onSendCommentSuccess: 'function',
    });
  });

  test('should hide <ProfileBar /> when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile-bar');

    this.set('session.model', null);

    // Act
    await render(hbs`
      {{site/page/-components/main-content
          --session=session
          --page=page
          --filterCommentsBy=filterCommentsBy
          --onFilterCommentsClick=(action onFilterCommentsClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <MainContentComments />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'site/page/-components/main-content/main-content-comments');

    // Act
    await render(hbs`
      {{site/page/-components/main-content
          --session=session
          --page=page
          --filterCommentsBy=filterCommentsBy
          --onFilterCommentsClick=(action onFilterCommentsClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      comments: 'instance',
      prioritizedComments: 'array',
      filterCommentsBy: 'string',
      onFilterCommentsClick: 'function',
      onSignInClick: 'function',
    });
  });

  test('should show <EmailLinkAuth /> when clicking sign in', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.model', null);

    const spy = spyComponent(this, 'email-link-auth');

    await render(hbs`
      {{site/page/-components/main-content
          --session=session
          --page=page
          --filterCommentsBy=filterCommentsBy
          --onFilterCommentsClick=(action onFilterCommentsClick)}}
    `);

    // Act
    await click('[data-test-comments-header="sign-in-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, { redirectUrl: 'string' });
  });
});
