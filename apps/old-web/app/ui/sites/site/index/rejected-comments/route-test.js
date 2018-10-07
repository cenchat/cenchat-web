import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/index/rejected-comments', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return rejected comments of the model for sites.site.index route', async function (assert) {
      assert.expect(1);

      // Arrange
      const site = await this.store.findRecord('site', 'site_a');
      const rejectedComments = await site.get('rejectedComments');
      const route = this.owner.lookup('route:sites/site/index/rejected-comments');

      route.set('modelFor', sinon.stub().withArgs('sites.site.index').returns(site));

      // Act
      const result = await route.model();

      // Assert
      assert.deepEqual(result.getEach('id'), rejectedComments.getEach('id'));
    });
  });
});
