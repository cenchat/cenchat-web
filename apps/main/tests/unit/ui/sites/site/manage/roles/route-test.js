import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/manage/roles', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: model', () => {
    test('should return site model of sites.site.manage route and its admins', async function (assert) {
      assert.expect(2);

      // Arrange
      const site = await this.store.findRecord('site', 'site_a');
      const admins = await site.get('admins');
      const route = this.owner.lookup('route:sites/site/manage/roles');

      route.set('modelFor', sinon.stub().withArgs('sites.site.manage').returns(site));

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result.site.get('id'), 'site_a');
      assert.deepEqual(result.admins.getEach('id'), admins.getEach('id'));
    });
  });

  module('function: setupController', () => {
    test('should set users with role for the controller', async function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/manage/roles');
      const route = this.owner.lookup('route:sites/site/manage/roles');

      // Act
      route.setupController(controller, { admins: ['foo'] });

      // Assert
      assert.deepEqual(controller.get('usersWithRole'), ['foo']);
    });
  });
});
