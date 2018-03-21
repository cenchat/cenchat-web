import { run } from '@ember/runloop';

import {
  getFixtureData,
  stubService,
  stubSession,
} from '@cenchat/core/test-support';
import { initialize as initializePromiseToRsvpPromise } from '@cenchat/core/initializers/promise-to-rsvp-promise';
import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

/**
 * `beforeEach()` setup for integration tests
 *
 * @param {Object} context Application context
 */
export async function setupBeforeEach(context) {
  initializePromiseToRsvpPromise(context.owner);
  mockFirebase(context.owner, getFixtureData());
  stubService(context, 'firebaseui', {
    startAuthUi() {},
    resetAuthUi() {},
  });
  stubService(context, 'router', { urlFor: sinon.stub() });

  context.set('session', stubSession(context));
  context.set('store', stubService(context, 'store'));

  const user = await run(() => {
    return context.get('store').findRecord('user', 'user_a');
  });

  context.set('session.model', user);
}

/**
 * `afterEach()` setup for integration tests
 *
 * @param {Object} context Application context
 * @return {Promise} Empty promise
 */
export function setupAfterEach(context) {
  return Promise.resolve();
}
