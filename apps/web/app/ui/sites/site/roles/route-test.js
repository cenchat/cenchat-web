import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/roles', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should use parent route model as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/roles');

    sinon.stub(route, 'paramsFor').withArgs('sites.site').returns({ site_id: 'site_a' });

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.id, 'site_a');
  });
});
