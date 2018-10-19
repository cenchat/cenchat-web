import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should verify site', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site');

    controller.set('model', await this.store.get('site', 'site_b'));

    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/utils/verify-site',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    // Act
    await controller.handleVerifySiteClick();

    // Assert
    const site = await this.store.get('site', 'site_b');

    assert.equal(site.isVerified, true);
  });
});
