import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | site/page/comments', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: handleLoadMoreCommentsClick', function () {
    test('should increase model limit', async function (assert) {
      assert.expect(1);

      // Arrange
      const comments = await this.store.query('comment', { limit: 2 });
      const controller = this.owner.lookup('controller:site/page/comments');

      controller.set('model', comments);

      // Act
      await controller.handleLoadMoreCommentsClick(4);

      // Assert
      assert.equal(comments.get('query.limit'), 4);
    });

    test('should reload model', async function (assert) {
      assert.expect(1);

      // Arrange
      const comments = await this.store.query('comment', { limit: 2 });
      const updateSpy = sinon.spy(comments, 'update');
      const controller = this.owner.lookup('controller:site/page/comments');

      controller.set('model', comments);

      // Act
      await controller.handleLoadMoreCommentsClick(4);

      // Assert
      assert.ok(updateSpy.calledOnce);
    });
  });
});
