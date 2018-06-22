import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/index', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('function: handleVerifySiteClick', () => {
    hooks.beforeEach(() => {
      const server = sinon.fakeServer.create();

      server.autoRespond = true;
      server.autoRespondAfter = 0;

      server.respondWith(
        'POST',
        'https://us-central1-cenchat-stg.cloudfunctions.net/app/api/utils/verify-site',
        [204, {}, ''],
      );
    });

    test('should verify site', async function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/index');

      controller.set('model', { id: 'foobar' });

      // Act
      await controller.handleVerifySiteClick();

      // Assert
      assert.ok(true);
    });
  });
});
