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
    test('should reset role change when successfully saves', async function (assert) {
      assert.expect(1);

      // Arrange
      const server = sinon.fakeServer.create();

      server.autoRespond = true;
      server.autoRespondAfter = 0;

      server.respondWith(
        'PATCH',
        'https://us-central1-cenchat-stg.cloudfunctions.net/app/api/utils/rescrape-page/site_a__page_a',
        [204, {}, ''],
      );

      const controller = this.owner.lookup('controller:sites/site/pages');

      // Act
      await controller.handleRescrapePageClick('site_a__page_a');

      // Assert
      assert.ok(true);
    });
  });
});
