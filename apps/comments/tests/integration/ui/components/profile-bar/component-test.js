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

module('Integration | Component | profile bar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const page = await run(() => {
      return this.get('store').findRecord('page', 'site_a__page_a');
    });

    this.set('page', page);
    this.set('isCommentComposerVisible', true);
    this.set('headerText', 'Foo');
    this.set('onSignOutClick', () => {});
    this.set('onSendCommentSuccess', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <CommentComposer /> when @isCommentComposerVisible is true', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-composer');

    // Act
    await render(hbs`
      {{profile-bar
          --page=page
          --isCommentComposerVisible=isCommentComposerVisible
          --headerText=headerText
          --onSignOutClick=(action onSignOutClick)
          --onSendCommentSuccess=(action onSendCommentSuccess)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      'page': 'instance',
      'onSendCommentSuccess': 'function',
    });
  });

  test('should hide <CommentComposer /> when @isCommentComposerVisible is false', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('isCommentComposerVisible', false);

    const spy = spyComponent(this, 'comment-composer');

    // Act
    await render(hbs`
      {{profile-bar
          --page=page
          --isCommentComposerVisible=isCommentComposerVisible
          --headerText=headerText
          --onSignOutClick=(action onSignOutClick)
          --onSendCommentSuccess=(action onSendCommentSuccess)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show header text', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile-bar
          --page=page
          --isCommentComposerVisible=isCommentComposerVisible
          --headerText=headerText
          --onSignOutClick=(action onSignOutClick)
          --onSendCommentSuccess=(action onSendCommentSuccess)}}
    `);

    // Assert
    assert.dom('[data-test-profile-bar="title"]').hasText('Foo');
  });

  test('should show <NotificationList />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'notification-list');

    // Act
    await render(hbs`
      {{profile-bar
          --page=page
          --isCommentComposerVisible=isCommentComposerVisible
          --headerText=headerText
          --onSignOutClick=(action onSignOutClick)
          --onSendCommentSuccess=(action onSendCommentSuccess)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { 'notifications': 'instance' });
  });

  test('should show notification badge when there are unread notifications', async function(assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile-bar
          --page=page
          --isCommentComposerVisible=isCommentComposerVisible
          --headerText=headerText
          --onSignOutClick=(action onSignOutClick)
          --onSendCommentSuccess=(action onSendCommentSuccess)}}
    `);

    // Assert
    assert
      .dom('[data-test-profile-bar="notification-button"] > button')
      .hasAttribute('badged');
  });

  test('should hide notification badge when there are no unread notifications', async function(assert) {
    assert.expect(1);

    // Arrange
    const meta = await run(() => {
      return this.get('store').findRecord('user-meta-info', 'user_a');
    });

    meta.set('hasNewNotification', false);

    // Act
    await render(hbs`
      {{profile-bar
          --page=page
          --isCommentComposerVisible=isCommentComposerVisible
          --headerText=headerText
          --onSignOutClick=(action onSignOutClick)
          --onSendCommentSuccess=(action onSendCommentSuccess)}}
    `);

    // Assert
    assert
      .dom('[data-test-profile-bar="notification-button"]')
      .doesNotHaveAttribute('badged');
  });
});
