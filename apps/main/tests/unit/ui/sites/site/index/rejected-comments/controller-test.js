import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/index/rejected-comments', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: handleApproveCommentClick', () => {
    test('should reject comment', async function (assert) {
      assert.expect(2);

      // Arrange
      const comment = await this.store.findRecord('comment', 'comment_f');
      const saveSpy = sinon.spy(comment, 'save');
      const controller = this.owner.lookup('controller:sites/site/index/rejected-comments');

      // Act
      await controller.handleApproveCommentClick(comment);

      // Assert
      assert.equal(comment.get('status'), 'approved');
      assert.ok(saveSpy.calledOnce);
    });
  });
});
