import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import {
  stubPromise,
  stubSession,
} from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/index/new', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.session = stubSession(this, { id: 'user_a' });
  });

  module('function: handleSiteFormSubmit', () => {
    test('should create new site', async function (assert) {
      assert.expect(2);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const createRecordStub = sinon.stub().returns({ save: saveStub });
      const controller = this.owner.lookup('controller:sites/index/new');

      controller.set('session', this.session);
      controller.set('store', { createRecord: createRecordStub });
      controller.set('transitionToRoute', sinon.stub());

      // Act
      await controller.handleSiteFormSubmit({
        hostname: 'foo.com',
        name: 'Foo',
        theme: 'light',
      }, {
        preventDefault: sinon.stub(),
      });

      // Assert
      assert.ok(createRecordStub.calledWithExactly(
        'site',
        {
          hostname: 'foo.com',
          name: 'Foo',
          theme: 'light',
        },
      ));
      assert.ok(saveStub.calledOnce);
    });

    test('should transition to sites.index after creating new site', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToRouteStub = sinon.stub();
      const controller = this.owner.lookup('controller:sites/index/new');

      controller.set('session', this.session);
      controller.set('store', {
        createRecord: sinon.stub().returns({
          save: sinon.stub().returns(stubPromise(true)),
        }),
      });
      controller.set('transitionToRoute', transitionToRouteStub);

      // Act
      await controller.handleSiteFormSubmit({
        hostname: 'foo.com',
        name: 'Foo',
        theme: 'light',
      }, {
        preventDefault: sinon.stub(),
      });

      // Assert
      assert.ok(transitionToRouteStub.calledWithExactly('sites.index'));
    });
  });
});
