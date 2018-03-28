import { run } from '@ember/runloop';

import {
  getFixtureData,
  stubService,
  stubSession,
} from '@cenchat/core/test-support';
import { initialize as initializeWindowOverrides } from '@cenchat/core/initializers/window-overrides';
import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

/**
 * `beforeEach()` setup for integration tests
 *
 * @param {Object} context Application context
 */
export async function setupBeforeEach(context) {
  initializeWindowOverrides(context.owner);
  mockFirebase(context.owner, getFixtureData());
  stubService(context, 'firebaseui', {
    startAuthUi() {},
    resetAuthUi() {},
  });
  stubService(context, 'router', { urlFor: sinon.stub() });

  context.set('session', stubSession(context));
  context.set('store', stubService(context, 'store'));

  const user = await run(() => context.get('store').findRecord('user', 'user_a'));

  context.set('session.model', user);
}

/**
 * `afterEach()` setup for integration tests
 *
 * @return {Promise} Empty promise
 */
export function setupAfterEach() {
  return Promise.resolve();
}
