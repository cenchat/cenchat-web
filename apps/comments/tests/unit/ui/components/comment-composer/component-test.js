import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import Service from '@ember/service';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Component | comment composer', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:session', Service.extend());

    this.comment = EmberObject.create({
      author: { id: 'user_a' },
      parsedAttachments: [],
      taggedUsers: [],
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
      assert.deepEqual(this.comment.get('taggedEntities'), undefined);
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
