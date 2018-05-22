import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/index/approved-comments', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return approved comments of the model for sites.site.index route', async function (assert) {
      assert.expect(1);

      // Arrange
      const site = await this.store.findRecord('site', 'site_a');
      const approvedComments = await site.get('approvedComments');
      const route = this.owner.lookup('route:sites/site/index/approved-comments');

      route.set('modelFor', sinon.stub().withArgs('sites.site.index').returns(site));

      // Act
      const result = await route.model();

      // Assert
      assert.deepEqual(result.getEach('id'), approvedComments.getEach('id'));
    });
  });
});
