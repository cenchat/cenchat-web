import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/pages/page/account', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return the page as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/account');

    sinon.stub(route, 'modelFor').returns('foo');

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result, 'foo');
  });
});
