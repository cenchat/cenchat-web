import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/page', function(hooks) {
  setupTest(hooks);

  module('hook: model', function() {
    test('should fetch page as model', async function(assert) {
      assert.expect(2);

      // Arrange
      const findRecordStub = sinon.stub().returns(stubPromise(true, 'foo'));
      const route = this.owner.lookup('route:sites/site/page');

      route.set('store', { findRecord: findRecordStub });
      route.set('paramsFor', sinon.stub().returns({ site_id: 'foo' }));

      // Act
      const result = await route.model({ page_id: 'site_a__page_a' });

      // Assert
      assert.ok(findRecordStub.calledWithExactly('page', 'site_a__page_a'));
      assert.equal(result, 'foo');
    });
  });
});
