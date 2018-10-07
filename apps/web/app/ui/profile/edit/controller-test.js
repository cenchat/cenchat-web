import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Controller | profile/edit', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should update profile', async function (assert) {
    assert.expect(5);

    // Arrange
    const model = await this.store.get('user', 'user_a');
    const controller = this.owner.lookup('controller:profile/edit');

    sinon.stub(controller, 'transitionToRoute');
    controller.set('model', model);

    // Act
    await controller.handleProfileFormSubmit({
      displayName: 'Display Name',
      shortBio: 'Short Bio',
      username: 'Username',
    }, {
      preventDefault: sinon.stub(),
    });

    // Assert
    const updatedProfile = await this.store.get('user', 'user_a');

    assert.equal(updatedProfile.displayName, 'Display Name');
    assert.equal(updatedProfile.displayUsername, 'Username');
    assert.equal(updatedProfile.name, 'display name');
    assert.equal(updatedProfile.shortBio, 'Short Bio');
    assert.equal(updatedProfile.username, 'username');
  });

  test('should transition to profile.index after updating profile', async function (assert) {
    assert.expect(1);

    // Arrange
    const model = await this.store.get('user', 'user_a');
    const controller = this.owner.lookup('controller:profile/edit');
    const transitionToRouteStub = sinon.stub(controller, 'transitionToRoute');

    controller.set('model', model);

    // Act
    await controller.handleProfileFormSubmit({
      displayName: 'Foo',
      username: 'Bar',
    }, {
      preventDefault: sinon.stub(),
    });

    // Assert
    assert.ok(transitionToRouteStub.calledWithExactly('profile.index'));
  });
});
