import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import Service from '@ember/service';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Component | comment item', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:session', Service.extend());

    this.comment = EmberObject.create({
      parsedAttachments: [],
      text: null,

      save() {
        return stubPromise(true);
      },
    });
  });

  module('function: handleDeleteCommentClick', function() {
    test('should update comment into delete state', async function(assert) {
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
      assert.equal(this.comment.get('text', null));
      assert.ok(saveStub.calledWithExactly({
        adapterOptions: { onServer: true },
      }));
    });
  });

  module('function: handleToggleQuoteClick', function() {
    test('should toggle on quote visibility', async function(assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({
        '--comment': this.comment,
        'isQuoteVisible': false,
      });

      // Act
      component.handleToggleQuoteClick();

      // Assert
      assert.equal(component.get('isQuoteVisible'), true);
    });

    test('should toggle off quote visibility', async function(assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({
        '--comment': this.comment,
        'isQuoteVisible': true,
      });

      // Act
      component.handleToggleQuoteClick();

      // Assert
      assert.equal(component.get('isQuoteVisible'), false);
    });
  });

  module('function: handleCancelEditClick', function() {
    test('should rollback comment attributes', async function(assert) {
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

    test('should set editing comment state to false', async function(assert) {
      assert.expect(1);

      // Arrange
      const rollbackAttributesStub = sinon.stub();

      this.comment.set('rollbackAttributes', rollbackAttributesStub);

      const factory = this.owner.factoryFor('component:comment-item');
      const component = await factory.create({
        '--comment': this.comment,
        'isEditingComment': true,
      });

      // Act
      component.handleCancelEditClick();

      // Assert
      assert.equal(component.get('isEditingComment'), false);
    });
  });
});
