import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/pages', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return site model for sites.site route and its pages', async function (assert) {
      assert.expect(2);

      // Arrange
      const site = await this.store.findRecord('site', 'site_a');
      const pages = await site.get('pages');
      const route = this.owner.lookup('route:sites/site/pages');

      route.set('modelFor', sinon.stub().withArgs('sites.site').returns(site));

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result.site.get('id'), 'site_a');
      assert.deepEqual(result.pages.getEach('id'), pages.getEach('id'));
    });
  });
});
