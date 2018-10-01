import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | profile/settings', function (hooks) {
  setupTest(hooks);

  module('function: handleDeleteAccountToastCompletion', function () {
    test('should delete account', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = {
        destroyRecord() {
          return stubPromise(true);
        },
      };
      const session = {
        close() {
          return stubPromise(true);
        },
      };
      const destroyRecordSpy = sinon.spy(model, 'destroyRecord');
      const controller = this.owner.lookup('controller:profile/settings');

      controller.set('model', model);
      controller.set('session', session);

      // Act
      await controller.handleDeleteAccountToastCompletion();

      // Assert
      assert.ok(destroyRecordSpy.calledWithExactly({
        adapterOptions: { onServer: true },
      }));
    });

    test('should sign out', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = {
        destroyRecord() {
          return stubPromise(true);
        },
      };
      const session = {
        close() {
          return stubPromise(true);
        },
      };
      const closeSpy = sinon.spy(session, 'close');
      const controller = this.owner.lookup('controller:profile/settings');

      controller.set('model', model);
      controller.set('session', session);

      // Act
      await controller.handleDeleteAccountToastCompletion();

      // Assert
      assert.ok(closeSpy.calledOnce);
    });
  });
});
