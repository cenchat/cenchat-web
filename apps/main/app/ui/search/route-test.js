import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | search', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should query for user', async function (assert) {
      assert.expect(2);

      // Arrange
      const queryStub = sinon.stub().returns(stubPromise(true, ['foobar']));
      const route = this.owner.lookup('route:search');

      route.set('store', { query: queryStub });

      // Act
      const result = await route.model({ query: 'foo' });

      // Assert
      assert.ok(queryStub.calledWith('user'));
      assert.deepEqual(result, ['foobar']);
    });
  });
});
