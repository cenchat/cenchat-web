import { click, render, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest, setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import Service from '@ember/service';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | comment-composer', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const comment = await this.store.findRecord('comment', 'comment_a');

    // Preload parsed attachments
    await comment.get('parsedAttachments');

    comment.set('isTextAllowed', false);
    comment.set('isMessageValid', true);

    this.set('comment', comment);
  });

  test('should show <ComposerMessage /> when comment message valid', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isMessageValid', true);

    const spy = spyComponent(this, 'comment-composer/comment-composer-message');

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onTextBoxInput: 'function',
      onRemoveAttachmentClick: 'function',
    });
  });

  test('should show <ComposerMessage /> when text comment is allowed', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isTextAllowed', true);

    const spy = spyComponent(this, 'comment-composer/comment-composer-message');

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onTextBoxInput: 'function',
      onRemoveAttachmentClick: 'function',
    });
  });

  test('should hide <ComposerMessage /> when comment message is invalid and text aren\'t allowed', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isMessageValid', false);
    this.set('comment.isTextAllowed', false);

    const spy = spyComponent(this, 'comment-composer/comment-composer-message');

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <CommentComposerTaggedEntityList /> when there is a tagged entity', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.taggedEntities', { user_b: 'user' });

    const spy = spyComponent(this, 'comment-composer/comment-composer-tagged-entity-list');

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      entities: 'instance',
      onUntagEntityClick: 'function',
    });
  });

  test('should hide <CommentComposerTaggedEntityList /> when there are no tagged entities', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.taggedEntities', null);

    const spy = spyComponent(this, 'comment-composer/comment-composer-tagged-entity-list');

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <ComposerToolbar />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'components/comment-composer/comment-composer-toolbar');

    // Act
    await render(hbs` {{comment-composer --comment=comment}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      comment: 'instance',
      onAddAttachmentClick: 'function',
      onAskMeAnythingClick: 'function',
      onSendCommentClick: 'function',
      onTagEntityClick: 'function',
    });
  });

  test('should add attachment when clicking it', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`{{comment-composer --comment=comment}}`);
    await click('[data-test-composer-toolbar="sticker-button"]');

    // Act
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');

    // Assert
    assert.dom('[data-test-message-image="attachment-image"]').exists({ count: 3 });
  });

  test('should limit adding of attachments to 4 items', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`{{comment-composer --comment=comment}}`);
    await click('[data-test-composer-toolbar="sticker-button"]');

    // Act
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');
    await click('[data-test-toolbar-sticker-panel="sticker-button__sticker_a1"]');

    // Assert
    assert.dom('[data-test-message-image="attachment-image"]').exists({ count: 4 });
  });

  test('should remove attachment when clicking the its remove button', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Act
    await click('[data-test-message-image="remove-attachment-button"]');

    // Assert
    assert.dom('[data-test-message-image="attachment-image"]').exists({ count: 1 });
  });

  test('should disable send button when comment message is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isMessageValid', false);

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.dom('[data-test-composer-toolbar="send-button"]').hasAttribute('disabled');
  });

  test('should enable send button when comment is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isMessageValid', true);

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.dom('[data-test-composer-toolbar="send-button"]').doesNotHaveAttribute('disabled');
  });

  test('should show hint when text comment isn\'t allowed', async function (assert) {
    assert.expect(1);

    // Assert
    this.set('comment.isTextAllowed', false);

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.dom('[data-test-comment-composer="hint"]').exists();
  });

  test('should hide hint when text comment is allowed', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('comment.isTextAllowed', true);

    // Act
    await render(hbs`{{comment-composer --comment=comment}}`);

    // Assert
    assert.dom('[data-test-comment-composer="hint"]').doesNotExist();
  });
});

module('Unit | Component | comment-composer', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:session', Service.extend());

    this.comment = EmberObject.create({
      author: { id: 'user_a' },
      parsedAttachments: [],
      taggedEntities: null,
      text: null,

      save() {
        return stubPromise(true);
      },
    });
  });

  module('hook: init', () => {
    test('should create a new comment and set it as the comment prop when @comment isn\'t available', async function (assert) {
      assert.expect(2);

      // Arrange
      const site = { id: 'site_a' };
      const page = { site, id: 'page_a' };
      const createRecordStub = sinon.stub().returns(this.comment);
      const factory = this.owner.factoryFor('component:comment-composer');

      // Act
      const component = await factory.create({
        store: { createRecord: createRecordStub },
        session: { model: 'sessionModel' },
        '--page': page,
      });

      return settled().then(() => {
        // Assert
        assert.ok(createRecordStub.calledWithExactly(
          'comment',
          {
            page,
            site,
            attachments: null,
            isAskMeAnything: false,
            isDeleted: false,
            author: 'sessionModel',
            replyTo: undefined,
            root: undefined,
            status: 'approved',
            taggedEntities: null,
            text: null,
          },
        ));
        assert.deepEqual(component.get('comment'), this.comment);
      });
    });

    test('should set @comment as comment prop when available', async function (assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.init();

      // Assert
      assert.deepEqual(component.get('comment'), this.comment);
    });
  });

  module('function: handleSendCommentClick', () => {
    test('should send comment', async function (assert) {
      assert.expect(1);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));

      this.comment.set('save', saveStub);

      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({
        store: { createRecord: sinon.stub().returns(this.comment) },
        session: { model: 'sessionModel' },
        '--page': 'page',
      });

      // Act
      await component.handleSendCommentClick();

      // Assert
      assert.ok(saveStub.calledOnce);
    });

    test('should fire @onSendCommentSuccess when available', async function (assert) {
      assert.expect(1);

      // Arrange
      const onSendCommentSuccessStub = sinon.stub();
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({
        store: { createRecord: sinon.stub().returns(this.comment) },
        session: { model: 'sessionModel' },
        '--page': 'page',
        '--onSendCommentSuccess': onSendCommentSuccessStub,
      });

      // Act
      await component.handleSendCommentClick();

      // Assert
      assert.ok(onSendCommentSuccessStub.calledWithExactly(this.comment));
    });
  });

  module('function: handleAddAttachmentClick', () => {
    test('should add comment attachment when total count < 4', async function (assert) {
      assert.expect(1);

      // Arrange
      const gif = { id: 'gif_a', type: 'tenor_gif' };
      const sticker = EmberObject.create({
        id: 'sticker_a',
        constructor: { modelName: 'sticker' },
      });
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleAddAttachmentClick(gif);
      component.handleAddAttachmentClick(sticker);
      component.handleAddAttachmentClick(gif);
      component.handleAddAttachmentClick(gif);
      component.handleAddAttachmentClick(gif);

      // Assert
      assert.deepEqual(this.comment.get('attachments'), [
        gif,
        { id: 'sticker_a', type: 'sticker' },
        gif,
        gif,
      ]);
    });
  });

  module('function: handleAskMeAnythingClick', () => {
    test('should toggle ask me anything in the comment to true', async function (assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleAskMeAnythingClick();

      // Assert
      assert.equal(component.get('comment.isAskMeAnything'), true);
    });

    test('should toggle ask me anything in the comment to false', async function (assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleAskMeAnythingClick();
      component.handleAskMeAnythingClick();

      // Assert
      assert.equal(component.get('comment.isAskMeAnything'), false);
    });
  });

  module('function: handleRemoveAttachmentClick', () => {
    test('should remove specified comment attachment', async function (assert) {
      assert.expect(1);

      // Arrange
      this.comment.set('attachments', ['new1', 'new2', 'new3']);

      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleRemoveAttachmentClick(1);

      // Assert
      assert.deepEqual(this.comment.get('attachments'), ['new1', 'new3']);
    });
  });

  module('function: handleTagEntityClick', () => {
    test('should tag an entity', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        id: 'user_b',
        constructor: { modelName: 'user' },
      });
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleTagEntityClick(user);

      // Assert
      assert.deepEqual(this.comment.get('taggedEntities'), {
        user_b: 'user',
      });
    });

    test('should not allow tagging the author', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({ id: 'user_a' });
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleTagEntityClick(user);

      // Assert
      assert.deepEqual(this.comment.get('taggedEntities'), null);
    });

    test('should not allow tagging more than 20 users', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        id: 'user_b',
        constructor: { modelName: 'user' },
      });
      const factory = this.owner.factoryFor('component:comment-composer');

      this.comment.set('taggedEntities', {
        user_1: 'user',
        user_2: 'user',
        user_3: 'user',
        user_4: 'user',
        user_5: 'user',
        user_6: 'user',
        user_7: 'user',
        user_8: 'user',
        user_9: 'user',
        user_10: 'user',
        user_11: 'user',
        user_12: 'user',
        user_13: 'user',
        user_14: 'user',
        user_15: 'user',
        user_16: 'user',
        user_17: 'user',
        user_18: 'user',
        user_19: 'user',
        user_20: 'user',
      });

      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleTagEntityClick(user);

      // Assert
      assert.deepEqual(this.comment.get('taggedEntities'), {
        user_1: 'user',
        user_2: 'user',
        user_3: 'user',
        user_4: 'user',
        user_5: 'user',
        user_6: 'user',
        user_7: 'user',
        user_8: 'user',
        user_9: 'user',
        user_10: 'user',
        user_11: 'user',
        user_12: 'user',
        user_13: 'user',
        user_14: 'user',
        user_15: 'user',
        user_16: 'user',
        user_17: 'user',
        user_18: 'user',
        user_19: 'user',
        user_20: 'user',
      });
    });
  });

  module('function: handleUntagUEntitylick', () => {
    test('should untag an entity', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({ id: 'user_a' });

      this.comment.set('taggedEntities', { user_a: 'user' });

      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleUntagEntityClick(user);

      // Assert
      assert.deepEqual(this.comment.get('taggedEntities'), null);
    });
  });

  module('function: handleTextBoxInput', () => {
    test('should set comment text', async function (assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-composer');
      const component = await factory.create({ '--comment': this.comment });

      // Act
      component.handleTextBoxInput('foo');

      // Assert
      assert.equal(this.comment.get('text'), 'foo');
    });
  });
});
