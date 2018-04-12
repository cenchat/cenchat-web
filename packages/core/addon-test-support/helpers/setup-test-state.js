import { run } from '@ember/runloop';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import { initialize as initializeWindowOverrides } from '@cenchat/core/initializers/window-overrides';
import { stubService, stubSession } from './stub-service';
import getFixtureData from '../fixture-data';

/**
 * @param {Object} context
 */
export async function setupTestState(context) {
  initializeWindowOverrides(context.owner);
  stubService(context, 'firebaseui', { startAuthUi() {}, resetAuthUi() {} });
  stubService(context, 'router', { urlFor: sinon.stub() });

  context.set('firebase', mockFirebase(context.owner, getFixtureData()));
  context.set('db', context.get('firebase').firestore());
  context.set('session', stubSession(context));

  const store = stubService(context, 'store');

  // Workarond to avoid runloop issues
  context.set('store', {
    createRecord(...args) {
      return run(() => store.createRecord(...args));
    },

    updateRecord(...args) {
      return run(() => store.updateRecord(...args));
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
  context.set('firebase', mockFirebase(context.owner, getFixtureData()));
  context.set('db', context.get('firebase').firestore());

  const session = context.owner.lookup('service:session');
  const sm = session.get('stateMachine');

  run(() => {
    sm.send('startOpen');
    sm.send('finishOpen', {
      currentUser: {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        photoURL: 'user_a.jpg',
        providerData: [{
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
