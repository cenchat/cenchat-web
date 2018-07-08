import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/pages/page', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: handleSavePageClick', () => {
    test('should update page slug', async function (assert) {
      assert.expect(1);

      // Arrange
      const page = await this.store.findRecord('page', 'site_a__page_a');
      const controller = this.owner.lookup('controller:sites/site/pages/page');

      controller.set('model', page);
      controller.set('transitionToRoute', sinon.stub());

      // Act
      await controller.handleSavePageClick('%2Ffoo%2Fbar');

      // Assert
      assert.equal(page.slug, '%2Ffoo%2Fbar');
    });

    test('should save page', async function (assert) {
      assert.expect(1);

      // Arrange
      const page = await this.store.findRecord('page', 'site_a__page_a');
      const saveSpy = sinon.spy(page, 'save');
      const controller = this.owner.lookup('controller:sites/site/pages/page');

      controller.set('model', page);
      controller.set('transitionToRoute', sinon.stub());

      // Act
      await controller.handleSavePageClick('%2Ffoo%2Fbar');

      // Assert
      assert.ok(saveSpy.calledOnce);
    });

    test('should rollback attributes when saving page fails', async function (assert) {
      assert.expect(1);

      // Arrange
      const page = await this.store.findRecord('page', 'site_a__page_a');

      page.save = sinon.stub().returns(stubPromise(false, {
        errors: [{ status: 500, detail: null }],
      }));

      const rollbackAttributes = sinon.spy(page, 'rollbackAttributes');
      const controller = this.owner.lookup('controller:sites/site/pages/page');

      controller.set('model', page);
      controller.set('transitionToRoute', sinon.stub());

      // Act
      await controller.handleSavePageClick('%2Ffoo%2Fbar');

      // Assert
      assert.ok(rollbackAttributes.calledOnce);
    });

    test('should transition to previous route', async function (assert) {
      assert.expect(1);

      // Arrange
      const page = await this.store.findRecord('page', 'site_a__page_a');
      const controller = this.owner.lookup('controller:sites/site/pages/page');
      const transitionToRouteStub = sinon.stub();

      controller.set('model', page);
      controller.set('transitionToRoute', transitionToRouteStub);

      // Act
      await controller.handleSavePageClick('%2Ffoo%2Fbar');

      // Assert
      assert.ok(transitionToRouteStub.calledWithExactly('sites.site.pages'));
    });
  });
});
