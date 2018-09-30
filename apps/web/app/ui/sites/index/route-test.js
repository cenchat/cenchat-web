import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | sites/index', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should use sites route model as model', async function (assert) {
      assert.expect(2);

      // Arrange
      const modelForStub = sinon.stub().returns('foo');
      const route = this.owner.lookup('route:sites/index');

      route.set('modelFor', modelForStub);

      // Act
      const result = await route.model();

      // Assert
      assert.ok(modelForStub.calledWithExactly('sites'));
      assert.equal(result, 'foo');
    });
  });
});
