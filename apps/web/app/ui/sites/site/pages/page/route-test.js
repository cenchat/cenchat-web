import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';

module('Unit | Route | sites/site/pages/page', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return page', async function (assert) {
      assert.expect(1);

      // Arrange
      const page = await this.store.findRecord('page', 'site_a__page_a');
      const route = this.owner.lookup('route:sites/site/pages/page');

      // Act
      const result = await route.model({ page_id: 'site_a__page_a' });

      // Assert
      assert.deepEqual(result, page);
    });
  });
});
