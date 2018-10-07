import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | profile/edit', (hooks) => {
  setupTest(hooks);

  module('function: handleProfileFormSubmit', () => {
    test('should update profile', async function (assert) {
      assert.expect(6);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const model = EmberObject.create({ save: saveStub });
      const controller = this.owner.lookup('controller:profile/edit');

      controller.set('model', model);
      controller.set('transitionToRoute', sinon.stub());

      // Act
      await controller.handleProfileFormSubmit({
        displayName: 'Display Name',
        shortBio: 'Short Bio',
        username: 'Username',
      }, {
        preventDefault: sinon.stub(),
      });

      // Assert
      assert.equal(model.get('displayName'), 'Display Name');
      assert.equal(model.get('displayUsername'), 'Username');
      assert.equal(model.get('name'), 'display name');
      assert.equal(model.get('shortBio'), 'Short Bio');
      assert.equal(model.get('username'), 'username');
      assert.ok(saveStub.calledOnce);
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

    test('should rollback profile when failing to save', async function (assert) {
      assert.expect(1);

      // Arrange
      const rollbackAttributesStub = sinon.stub();
      const model = EmberObject.create({
        rollbackAttributes: rollbackAttributesStub,
        save: sinon.stub().returns(stubPromise(false, { code: 'permission-denied' })),
      });
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
      assert.ok(rollbackAttributesStub.calledOnce);
    });
  });
});
