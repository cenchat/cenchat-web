import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should fetch site as model', async function (assert) {
      assert.expect(2);

      // Arrange
      const findRecordStub = sinon.stub().returns(stubPromise(true, 'foo'));
      const route = this.owner.lookup('route:sites/site');

      route.set('store', { findRecord: findRecordStub });

      // Act
      const result = await route.model({ site_id: 'site_a' });

      // Assert
      assert.ok(findRecordStub.calledWithExactly('site', 'site_a'));
      assert.equal(result, 'foo');
    });
  });
});
