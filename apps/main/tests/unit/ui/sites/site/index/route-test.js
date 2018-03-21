import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | sites/site/index', function(hooks) {
  setupTest(hooks);

  module('hook: model', function() {
    test('should use sites.site route model as model', async function(assert) {
      assert.expect(2);

      // Arrange
      const modelForStub = sinon.stub().returns('foo');
      const route = this.owner.lookup('route:sites/site/index');

      route.set('modelFor', modelForStub);

      // Act
      const result = await route.model();

      // Assert
      assert.ok(modelForStub.calledWithExactly('sites.site'));
      assert.equal(result, 'foo');
    });
  });
});
