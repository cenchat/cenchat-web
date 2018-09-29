import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/index/approved-comments', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: handleRejectCommentClick', () => {
    test('should reject comment', async function (assert) {
      assert.expect(2);

      // Arrange
      const comment = await this.store.findRecord('comment', 'comment_a');
      const saveSpy = sinon.spy(comment, 'save');
      const controller = this.owner.lookup('controller:sites/site/index/approved-comments');

      // Act
      await controller.handleRejectCommentClick(comment);

      // Assert
      assert.equal(comment.get('status'), 'rejected');
      assert.ok(saveSpy.calledOnce);
    });
  });
});
