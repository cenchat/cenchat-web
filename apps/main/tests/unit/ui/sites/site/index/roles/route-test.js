import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

module('Unit | Route | sites/site/index/roles', (hooks) => {
  setupTest(hooks);

  module('function: model', () => {
    test('should fetch return parent route model', async function (assert) {
      assert.expect(1);

      // Arrange
      const site = EmberObject.create({ admins: ['foo'] });
      const route = this.owner.lookup('route:sites/site/index/roles');

      route.set('modelFor', sinon.stub().withArgs('sites.site.index').returns(site));

      // Act
      const result = await route.model();

      // Assert
      assert.deepEqual(result, { site, admins: ['foo'] });
    });
  });

  module('function: setupController', () => {
    test('should set users with role for the controller', async function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/index/roles');
      const route = this.owner.lookup('route:sites/site/index/roles');

      // Act
      route.setupController(controller, { admins: ['foo'] });

      // Assert
      assert.deepEqual(controller.get('usersWithRole'), ['foo']);
    });
  });
});
