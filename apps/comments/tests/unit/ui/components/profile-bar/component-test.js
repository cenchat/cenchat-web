import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import {
  stubPromise,
  stubSession,
} from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Component | profile bar', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.session = stubSession(this, EmberObject.create({ id: 'user_a' }));
  });

  module('function: handleSignOutClick', () => {
    test('should sign out', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true));

      this.session.set('close', stub);

      const factory = this.owner.factoryFor('component:profile-bar');
      const component = await factory.create();

      component.set('session', this.session);

      // Act
      await component.handleSignOutClick();

      // Assert
      assert.ok(stub.calledOnce);
    });
  });

  module('function: handleNotificationDropdownClick', () => {
    test('should mark has new notifications as false', async function (assert) {
      assert.expect(3);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const meta = EmberObject.create({
        hasNewNotification: true,
        save: saveStub,
      });
      const findRecordStub = sinon.stub().returns(stubPromise(true, meta));
      const factory = this.owner.factoryFor('component:profile-bar');
      const component = await factory.create();

      component.set('store', { findRecord: findRecordStub });

      // Act
      await component.handleNotificationDropdownClick();

      // Assert
      assert.ok(findRecordStub.calledWithExactly('userMetaInfo', 'user_a'));
      assert.equal(meta.get('hasNewNotification'), false);
      assert.ok(saveStub.calledOnce);
    });
  });
});
