import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Component | comment list', function(hooks) {
  setupTest(hooks);

  module('function: loadMoreComments', function(hooks) {
    hooks.beforeEach(function() {
      this.comments = EmberObject.create({
        length: 2,
      });
    });

    test('should re-query for more comments', async function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true));
      const factory = this.owner.factoryFor('component:comment-list');
      const component = await factory.create({
        '--comments': this.comments,
        '--onLoadMoreCommentsClick': stub,
      });

      // Act
      await component.loadMoreComments();

      // Assert
      assert.ok(stub.calledOnce);
    });

    test('should increase limit of comments to show', async function(assert) {
      assert.expect(1);

      // Arrange
      const factory = this.owner.factoryFor('component:comment-list');
      const component = await factory.create({
        '--comments': this.comments,
        '--onLoadMoreCommentsClick': sinon.stub().returns(stubPromise(true)),
      });

      // Act
      await component.loadMoreComments();

      // Assert
      assert.equal(component.get('limit'), 6);
    });
  });
});
