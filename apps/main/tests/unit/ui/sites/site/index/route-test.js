import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/index', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return model of sites.site route', async function (assert) {
      assert.expect(1);

      // Arrange
      const site = await this.store.findRecord('site', 'site_a');
      const route = this.owner.lookup('route:sites/site/index');

      route.set('modelFor', sinon.stub().withArgs('sites.site').returns(site));

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result.get('id'), 'site_a');
    });
  });

  module('hook: afterModel', () => {
    test('should transition to sites.site.index.approved-comments when site is verified and is not intending to transition to sites.site.index.approved-comments or sites.site.index.rejected-comments', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const site = await this.store.findRecord('site', 'site_a');
      const route = this.owner.lookup('route:sites/site/index');

      route.set('transitionTo', transitionToStub);

      // Act
      await route.afterModel(site, { targetName: 'sites.site.index' });

      // Assert
      assert.ok(transitionToStub.calledWithExactly('sites.site.index.approved-comments'));
    });

    test('should transition to transition.targetName when site is verified and is intending to transition to sites.site.index.approved-comments', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const site = await this.store.findRecord('site', 'site_a');
      const route = this.owner.lookup('route:sites/site/index');

      route.set('transitionTo', transitionToStub);

      // Act
      await route.afterModel(site, { targetName: 'sites.site.index.approved-comments' });

      // Assert
      assert.ok(transitionToStub.calledWithExactly('sites.site.index.approved-comments'));
    });

    test('should transition to transition.targetName when site is verified and is intending to transition to sites.site.index.rejected-comments', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const site = await this.store.findRecord('site', 'site_a');
      const route = this.owner.lookup('route:sites/site/index');

      route.set('transitionTo', transitionToStub);

      // Act
      await route.afterModel(site, { targetName: 'sites.site.index.rejected-comments' });

      // Assert
      assert.ok(transitionToStub.calledWithExactly('sites.site.index.rejected-comments'));
    });
  });
});
