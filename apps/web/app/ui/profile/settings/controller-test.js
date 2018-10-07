import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Controller | profile/settings', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should be able to delete account', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:profile/settings');
    const server = sinon.fakeServer.create();

    sinon.stub(this.session, 'close').returns(Promise.resolve());

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/users',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    // Act
    await controller.handleDeleteAccountToastCompletion();

    // Assert
    assert.ok(true);
  });

  test('should sign out when deleting account', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:profile/settings');
    const closeStub = sinon.stub(this.session, 'close');
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/users',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    // Act
    await controller.handleDeleteAccountToastCompletion();

    // Assert
    assert.ok(closeStub.calledOnce);
  });
});
