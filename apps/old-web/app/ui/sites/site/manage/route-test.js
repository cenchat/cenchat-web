import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/manage', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return site model for sites.site route', async function (assert) {
      assert.expect(1);

      // Arrange
      const site = await this.store.findRecord('site', 'site_a');
      const route = this.owner.lookup('route:sites/site/manage');

      route.set('modelFor', sinon.stub().withArgs('sites.site').returns(site));

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result.get('id'), 'site_a');
    });
  });
});
