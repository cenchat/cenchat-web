import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | comment', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return comment', async function (assert) {
      assert.expect(2);

      // Arrange
      const findRecordStub = sinon.stub().returns(stubPromise(true, 'foo'));
      const route = this.owner.lookup('route:comments');

      route.set('store', { findRecord: findRecordStub });

      // Act
      const result = await route.model({ comment_id: 'comment_a' });

      // Assert
      assert.ok(findRecordStub.calledWithExactly('comment', 'comment_a'));
      assert.equal(result, 'foo');
    });
  });
});
