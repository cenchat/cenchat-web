import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import ObjectProxy from '@ember/object/proxy';

import {
  stubPromise,
  stubService,
} from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Component | sign in form', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    stubService(this, 'session', {});
  });

  module('function: fetchOrCreateUserRecord', function() {
    test('should fetch session model after signing in', async function(assert) {
      assert.expect(2);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true, 'foo'));
      const factory = this.owner.factoryFor('component:sign-in-form');
      const component = await factory.create({
        session: ObjectProxy.create({
          content: EmberObject.create({
            isAuthenticated: true,
            uid: 'user_a',
            currentUser: {
              displayName: 'User A',
              email: 'user_a@gmail.com',
              photoURL: 'user_a.jpg',
              providerData: [{
                photoURL: 'user_a.jpg',
                providerId: 'facebook.com',
              }, {
                photoURL: 'user_a.jpg',
                providerId: 'google.com',
              }],
              uid: 'user_a',
            },
          }),

          fetch: sinon.stub().returns(stubPromise(true)),
        }),
        store: { findRecord: stub },
      });

      // Act
      await component.fetchOrCreateUserRecord();

      // Assert
      assert.ok(stub.calledWithExactly('user', 'user_a'));
      assert.equal(component.get('session.model'), 'foo');
    });

    test('should create session model record when fetching that record fails', async function(assert) {
      assert.expect(3);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const createRecordStub = sinon.stub().returns({ save: saveStub });
      const factory = this.owner.factoryFor('component:sign-in-form');
      const component = await factory.create({
        session: ObjectProxy.create({
          content: EmberObject.create({
            isAuthenticated: true,
            uid: 'user_a',

            currentUser: {
              displayName: 'User A',
              email: 'user_a@gmail.com',
              photoURL: 'user_a.jpg',

              providerData: [{
                photoURL: 'user_a.jpg',
                providerId: 'facebook.com',
              }, {
                photoURL: 'user_a.jpg',
                providerId: 'google.com',
              }],

              uid: 'user_a',
            },
          }),

          fetch: sinon.stub().returns(stubPromise(true)),
        }),
        store: {
          createRecord: createRecordStub,
          findRecord: sinon.stub().returns(stubPromise(false)),
        },
      });

      // Act
      await component.fetchOrCreateUserRecord();

      // Assert
      assert.ok(createRecordStub.calledWithExactly('user', {
        id: 'user_a',
        displayName: 'User A',
        photoUrl: 'user_a.jpg',
      }));
      assert.ok(saveStub.calledOnce);
      assert.ok(component.get('session.model'), createRecordStub());
    });

    test('should transition to profile after signing in', async function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub();
      const factory = this.owner.factoryFor('component:sign-in-form');
      const component = await factory.create({
        session: ObjectProxy.create({
          content: EmberObject.create({
            isAuthenticated: true,

            currentUser: {
              displayName: 'User A',
              email: 'user_a@gmail.com',
              photoURL: 'user_a.jpg',

              providerData: [{
                photoURL: 'user_a.jpg',
                providerId: 'facebook.com',
              }, {
                photoURL: 'user_a.jpg',
                providerId: 'google.com',
              }],

              uid: 'user_a',
            },
          }),

          fetch: sinon.stub().returns(stubPromise(true)),
        }),
        store: {
          findRecord: sinon.stub().returns(stubPromise(
            true,
            EmberObject.create({ id: 'user_a' }),
          )),
        },
        router: { transitionTo: stub },
      });

      // Act
      await component.fetchOrCreateUserRecord();

      // Assert
      assert.ok(stub.calledWithExactly('profile', 'user_a'));
    });
  });
});
