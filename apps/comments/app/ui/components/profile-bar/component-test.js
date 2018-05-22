import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest, setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent, stubPromise, stubSession } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | profile-bar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const page = await this.store.findRecord('page', 'site_a__page_a');

    this.set('page', page);
    this.set('isCommentComposerVisible', true);
    this.set('headerText', 'Foo');
    this.set('onSignOutClick', () => {});
    this.set('onSendCommentSuccess', () => {});
  });

  test('should show <CommentComposer /> when @isCommentComposerVisible is true', async function (assert) {
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
      page: 'instance',
      onSendCommentSuccess: 'function',
    });
  });

  test('should hide <CommentComposer /> when @isCommentComposerVisible is false', async function (assert) {
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

  test('should show header text', async function (assert) {
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

  test('should show <NotificationList />', async function (assert) {
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
    assert.deepEqual(spy.componentArgsType, { notifications: 'instance' });
  });

  test('should show notification badge when there are unread notifications', async function (assert) {
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
    assert.dom('[data-test-profile-bar="notification-button"] > button').hasAttribute('badged');
  });

  test('should hide notification badge when there are no unread notifications', async function (assert) {
    assert.expect(1);

    // Arrange
    const meta = await this.store.findRecord('user-meta-info', 'user_a');

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
    assert.dom('[data-test-profile-bar="notification-button"]').doesNotHaveAttribute('badged');
  });
});

module('Unit | Component | profile-bar', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.session = stubSession(this, EmberObject.create({ id: 'user_a' }));
  });

  module('function: handleSignOutClick', () => {
    test('should sign out', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true));

      this.session.set('close', stub);

      const factory = this.owner.factoryFor('component:profile-bar');
      const component = await factory.create();

      component.set('session', this.session);

      // Act
      await component.handleSignOutClick();

      // Assert
      assert.ok(stub.calledOnce);
    });
  });

  module('function: handleNotificationDropdownClick', () => {
    test('should mark has new notifications as false', async function (assert) {
      assert.expect(3);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const meta = EmberObject.create({
        hasNewNotification: true,
        save: saveStub,
      });
      const findRecordStub = sinon.stub().returns(stubPromise(true, meta));
      const factory = this.owner.factoryFor('component:profile-bar');
      const component = await factory.create();

      component.set('store', { findRecord: findRecordStub });

      // Act
      await component.handleNotificationDropdownClick();

      // Assert
      assert.ok(findRecordStub.calledWithExactly('userMetaInfo', 'user_a'));
      assert.equal(meta.get('hasNewNotification'), false);
      assert.ok(saveStub.calledOnce);
    });
  });
});
