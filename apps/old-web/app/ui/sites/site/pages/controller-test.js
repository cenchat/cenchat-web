import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/pages', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: handleRescrapePageClick', () => {
    test('should save page', async function (assert) {
      assert.expect(1);

      // Arrange
      const page = await this.store.findRecord('page', 'site_a__page_a');
      const saveSpy = sinon.spy(page, 'save');
      const controller = this.owner.lookup('controller:sites/site/pages');

      // Act
      await controller.handleRescrapePageClick(page);

      // Assert
      assert.ok(saveSpy.calledOnce);
    });
  });
});
