import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest, setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sign-in-form', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('nothing to test', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{sign-in-form}}`);

    // Assert
    assert.ok(true);
  });
});


module('Unit | Component | sign-in-form', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.session = ObjectProxy.create({
      content: EmberObject.create({
        isAuthenticated: true,
        uid: 'user_a',
        currentUser: {
          displayName: 'User A',
          email: 'user_a@gmail.com',
          photoURL: 'user_a.jpg',
          providerData: [{
            uid: '12345',
            photoURL: 'user_a.jpg',
            providerId: 'facebook.com',
          }],
          uid: 'user_a',
        },
      }),

      fetch: sinon.stub().returns(stubPromise(true)),
    });
  });

  module('function: fetchOrCreateUserRecord', () => {
    test('should fetch session model after signing in', async function (assert) {
      assert.expect(2);

      // Arrange
      const user = EmberObject.create();
      const findRecordStub = sinon.stub().returns(stubPromise(true, user));
      const factory = this.owner.factoryFor('component:sign-in-form');
      const component = await factory.create({
        session: this.session,
        store: { findRecord: findRecordStub },
        router: { transitionTo: sinon.stub() },
      });

      // Act
      await component.fetchOrCreateUserRecord(this.session.get('currentUser'));

      // Assert
      assert.ok(findRecordStub.calledWithExactly('user', 'user_a'));
      assert.deepEqual(component.get('session.model'), user);
    });

    test('should create session model record when fetching that record fails', async function (assert) {
      assert.expect(4);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const user = EmberObject.create({ save: saveStub });
      const createRecordStub = sinon.stub().returns(user);
      const factory = this.owner.factoryFor('component:sign-in-form');
      const component = await factory.create({
        session: this.session,
        store: {
          createRecord: createRecordStub,
          findRecord: sinon.stub().returns(stubPromise(false)),
        },
        router: { transitionTo: sinon.stub() },
      });

      // Act
      await component.fetchOrCreateUserRecord(this.session.get('currentUser'));

      // Assert
      assert.ok(createRecordStub.calledWithExactly(
        'user',
        {
          id: 'user_a',
          displayName: 'User A',
          photoUrl: 'user_a.jpg',
        },
      ));
      assert.equal(this.session.get('content.model.facebookId'), '12345');
      assert.ok(saveStub.calledOnce);
      assert.ok(component.get('session.model'), user);
    });

    test('should transition to profile after signing in', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({ id: 'user_a' });
      const transitionToStub = sinon.stub();
      const factory = this.owner.factoryFor('component:sign-in-form');
      const component = await factory.create({
        session: this.session,
        store: { findRecord: sinon.stub().returns(stubPromise(true, user)) },
        router: { transitionTo: transitionToStub },
      });

      // Act
      await component.fetchOrCreateUserRecord(this.session.get('currentUser'));

      // Assert
      assert.ok(transitionToStub.calledWithExactly('profile', 'user_a'));
    });

    test('should save Facebook access token when its credential is available', async function (assert) {
      assert.expect(2);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const userMetaInfo = EmberObject.create({ save: saveStub });
      const user = EmberObject.create({ metaInfo: userMetaInfo });
      const factory = this.owner.factoryFor('component:sign-in-form');
      const component = await factory.create({
        session: this.session,
        store: { findRecord: sinon.stub().returns(stubPromise(true, user)) },
        router: { transitionTo: sinon.stub() },
      });

      // Act
      await component.fetchOrCreateUserRecord(this.session.get('currentUser'), {
        accessToken: '12345',
      });

      // Assert
      assert.equal(userMetaInfo.get('facebookAccessToken'), '12345');
      assert.ok(saveStub.calledOnce);
    });
  });
});
