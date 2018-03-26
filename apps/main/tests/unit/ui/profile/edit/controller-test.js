import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | profile/edit', (hooks) => {
  setupTest(hooks);

  module('function: handleProfileFormSubmit', () => {
    test('should update profile', async function (assert) {
      assert.expect(4);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const model = EmberObject.create({ save: saveStub });
      const controller = this.owner.lookup('controller:profile/edit');

      controller.set('model', model);
      controller.set('transitionToRoute', sinon.stub());

      // Act
      await controller.handleProfileFormSubmit({
        displayName: 'Foo',
        username: 'Bar',
      }, {
        preventDefault: sinon.stub(),
      });

      // Assert
      assert.equal(model.get('displayName'), 'Foo');
      assert.equal(model.get('displayUsername'), 'Bar');
      assert.equal(model.get('username'), 'bar');
      assert.ok(saveStub.calledWithExactly({ adapterOptions: { onServer: true } }));
    });

    test('should transition to profile.index after updating profile', async function (assert) {
      assert.expect(1);

      // Arrange
      const transtionToRouteStub = sinon.stub();
      const model = EmberObject.create({
        save: sinon.stub().returns(stubPromise(true)),
      });
      const controller = this.owner.lookup('controller:profile/edit');

      controller.set('model', model);
      controller.set('transitionToRoute', transtionToRouteStub);

      // Act
      await controller.handleProfileFormSubmit({
        displayName: 'Foo',
        username: 'Bar',
      }, {
        preventDefault: sinon.stub(),
      });

      // Assert
      assert.ok(transtionToRouteStub.calledWithExactly('profile.index'));
    });
  });
});
