import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: beforeModel', () => {
    test('should transition home when not a site admin', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:sites/site');

      route.set('routeName', 'sites.site');
      route.set('paramsFor', sinon.stub().withArgs('sites.site').returns({ site_id: 'site_c' }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(transitionToStub.called);
    });

    test('should not transition home when a site admin', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:sites/site');

      route.set('routeName', 'sites.site');
      route.set('paramsFor', sinon.stub().withArgs('sites.site').returns({ site_id: 'site_a' }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(transitionToStub.notCalled);
    });
  });

  module('hook: model', () => {
    test('should return site', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:sites/site');

      // Act
      const result = await route.model({ site_id: 'site_a' });

      // Assert
      assert.equal(result.get('id'), 'site_a');
    });
  });
});
