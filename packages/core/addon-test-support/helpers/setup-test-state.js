import { run } from '@ember/runloop';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import { initialize as initializeWindowOverrides } from '@cenchat/core/initializers/window-overrides';
import { stubService, stubSession } from './stub-service';
import getFixtureData from '../fixture-data';
import stubPromise from './stub-promise';

/**
 * @param {Object} context
 */
export async function setupTestState(context) {
  initializeWindowOverrides(context.owner);
  stubService(context, 'firebaseui', { startAuthUi() {}, resetAuthUi() {} });

  context.set('firebase', mockFirebase(context.owner, getFixtureData()));
  context.set('firebase.auth', () => ({ isSignInWithEmailLink: sinon.stub().returns(false) }));
  context.set('db', context.firebase.firestore());
  context.set('router', stubService(context, 'router', { urlFor: sinon.stub() }));
  context.set('session', stubSession(context));

  const store = stubService(context, 'store');

  context.set('store', {
    createRecord(...args) {
      return run(() => store.createRecord(...args));
    },

    findAll(...args) {
      return run(() => store.findAll(...args));
    },

    findRecord(...args) {
      return run(() => store.findRecord(...args));
    },

    query(...args) {
      return run(() => store.query(...args));
    },
  });

  const user = await context.store.findRecord('user', 'user_a');

  context.set('session.model', user);
}

/**
 * Setup application test state
 *
 * @param {Object} context
 */
export async function setupApplicationTestState(context) {
  stubService(context, 'firebaseui', { startAuthUi() {}, resetAuthUi() {} });

  context.set('firebase', mockFirebase(context.owner, getFixtureData()));
  context.set('firebase.messaging', () => ({
    onTokenRefresh(callback) {
      return callback();
    },

    getToken() {
      return stubPromise(true, 'token_a');
    },

    requestPermission() {
      return stubPromise(true);
    },
  }));
  context.set('firebase.auth', () => ({
    signOut() {
      return stubPromise(true);
    },
  }));
  context.set('db', context.firebase.firestore());

  const session = context.owner.lookup('service:session');
  const { stateMachine } = session;

  run(() => {
    stateMachine.send('startOpen');
    stateMachine.send('finishOpen', {
      currentUser: {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        providerData: [{
          displayName: 'User A',
          photoURL: 'user_a.jpg',
          providerId: 'facebook.com',
        }],
        uid: 'user_a',

        getIdToken() {
          return Promise.resolve(12345);
        },

        updateProfile() {},
      },
      isAuthenticated: true,
    });
  });
}
