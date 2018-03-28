import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | profile/follow-suggestions', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should use profile route model as model', async function (assert) {
      assert.expect(2);

      // Arrange
      const modelForStub = sinon.stub().returns('foo');
      const route = this.owner.lookup('route:profile/follow-suggestions');

      route.set('modelFor', modelForStub);

      // Act
      const result = await route.model();

      // Assert
      assert.ok(modelForStub.calledWithExactly('profile'));
      assert.equal(result, 'foo');
    });
  });
});
