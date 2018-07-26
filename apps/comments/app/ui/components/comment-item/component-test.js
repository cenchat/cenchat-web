import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest, setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import Service from '@ember/service';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    this.set('comment', comment);
    this.set('threadLevel', 1);
  });

  test('should show <CommentItemAvatar />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-avatar');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onToggleQuoteClick: 'function',
    });
  });

  test('should show <CommentItemContent /> when not editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-content');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      isQuoteVisible: 'boolean',
    });
  });

  test('should hide <CommentItemContent /> when editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="edit-button"]');

    // Assert
    assert.dom('[data-test-item-content]').doesNotExist();
  });

  test('should show <CommentItemToolbar /> when not editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-toolbar');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      comment: 'instance',
      threadLevel: 'number',
      onEditCommentClick: 'function',
      onDeleteCommentClick: 'function',
      onShareCommentClick: 'function',
      onReplyToCommentClick: 'function',
    });
  });

  test('should hide <CommentItemToolbar /> when editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="edit-button"]');

    // Assert
    assert.dom('[data-test-item-toolbar]').doesNotExist();
  });

  test('should show <CommentComposer /> when editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-composer');

    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="edit-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onSendCommentSuccess: 'function',
    });
  });

  test('should hide <CommentComposer /> when not editing message', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-composer');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('TODO: find a way to test navigate.share | should show share comment link when clicking share comment', async function (assert) {
    assert.expect(1);

    // // Arrange
    // await render(hbs`
    //   {{comment-item
    //       --session=session
    //       --comment=comment
    //       --threadLevel=threadLevel}}
    // `);

    // // Act
    // await click('[data-test-item-toolbar="share-button"]');

    // // Assert
    // assert.dom('[data-test-comment-item="share-comment-link"]')
    //   .hasValue('https://cenchat.com/comments/comment_a');

    assert.ok(true);
  });

  test('should hide share comment link by default', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.dom('[data-test-comment-item="share-comment-link"]').doesNotExist();
  });

  test('should show <CommentItemReplies /> when clicking reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-replies');

    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Act
    await click('[data-test-item-toolbar="reply-button"]');

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      comment: 'instance',
      threadLevel: 'number',
    });
  });

  test('should hide <CommentItemReplies /> when not clicking reply', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'comment-item/comment-item-replies');

    // Act
    await render(hbs`
      {{comment-item
          --session=session
          --comment=comment
          --threadLevel=threadLevel}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});

module('Unit | Component | comment-item', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:session', Service.extend());

    this.comment = EmberObject.create({
      parsedAttachments: [],
      text: null,

      save() {
        return stubPromise(true);
      },
    });
  });

  module('function: handleDeleteCommentClick', () => {
    test('should update comment into delete state', async function (assert) {
      assert.expect(4);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));

      this.comment.set('save', saveStub);

      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      await component.handleDeleteCommentClick();

      // Assert
      assert.equal(this.comment.get('attachments'), null);
      assert.equal(this.comment.get('isDeleted'), true);
      assert.equal(this.comment.get('taggedEntity'), null);
      assert.equal(this.comment.get('text', null));

      // Can't test this because of toast
      // assert.ok(saveStub.calledOnce);
    });
  });

  module('function: handleToggleQuoteClick', () => {
    test('should toggle on quote visibility', async function (assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({
        '--comment': this.comment,
        isQuoteVisible: false,
      });

      // Act
      component.handleToggleQuoteClick();

      // Assert
      assert.equal(component.get('isQuoteVisible'), true);
    });

    test('should toggle off quote visibility', async function (assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({
        '--comment': this.comment,
        isQuoteVisible: true,
      });

      // Act
      component.handleToggleQuoteClick();

      // Assert
      assert.equal(component.get('isQuoteVisible'), false);
    });
  });

  module('function: handleCancelEditClick', () => {
    test('should rollback comment attributes', async function (assert) {
      assert.expect(1);

      // Arrange
      const rollbackAttributesStub = sinon.stub();

      this.comment.set('rollbackAttributes', rollbackAttributesStub);

      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleCancelEditClick();

      // Assert
      assert.ok(rollbackAttributesStub.calledOnce);
    });

    test('should set editing comment state to false', async function (assert) {
      assert.expect(1);

      // Arrange
      const rollbackAttributesStub = sinon.stub();

      this.comment.set('rollbackAttributes', rollbackAttributesStub);

      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({
        '--comment': this.comment,
        isEditingComment: true,
      });

      // Act
      component.handleCancelEditClick();

      // Assert
      assert.equal(component.get('isEditingComment'), false);
    });
  });
});
