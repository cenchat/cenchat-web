import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubSession, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | notifications', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.session = stubSession(this, EmberObject.create({ id: 'user_a' }));
  });

  module('hook: model', () => {
    test('should return session model', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:notifications');

      route.set('session', this.session);

      // Act
      const result = await route.model();

      // Act
      assert.equal(result.get('id'), 'user_a');
    });
  });

  module('hook: afterModel', () => {
    test('should mark has new notifications as false', async function (assert) {
      assert.expect(3);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const meta = EmberObject.create({
        hasNewNotification: true,
        save: saveStub,
      });
      const findRecordStub = sinon.stub().returns(stubPromise(true, meta));
      const route = this.owner.lookup('route:notifications');

      route.set('session', this.session);
      route.set('store', { findRecord: findRecordStub });

      // Act
      await route.afterModel();

      // Assert
      assert.ok(findRecordStub.calledWithExactly('userMetaInfo', 'user_a'));
      assert.equal(meta.get('hasNewNotification'), false);
      assert.ok(saveStub.calledOnce);
    });
  });
});
