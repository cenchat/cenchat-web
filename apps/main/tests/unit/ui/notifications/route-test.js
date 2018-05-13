import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubSession, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | notifications', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.session = stubSession(this, EmberObject.create({
      id: 'user_a',
      metaInfo: EmberObject.create({
        hasNewNotification: true,

        save() {
          return stubPromise(true);
        },
      }),
      notifications: 'foo',
    }));
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
      assert.equal(result, 'foo');
    });
  });

  module('hook: afterModel', () => {
    test('should mark has new notifications as false', async function (assert) {
      assert.expect(2);

      // Arrange
      const saveSpy = sinon.spy(this.session.model.metaInfo, 'save');
      const route = this.owner.lookup('route:notifications');

      route.set('session', this.session);

      // Act
      await route.afterModel();

      // Assert
      assert.equal(this.session.model.metaInfo.get('hasNewNotification'), false);
      assert.ok(saveSpy.calledOnce);
    });
  });
});
