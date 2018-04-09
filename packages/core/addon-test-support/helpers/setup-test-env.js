import { run } from '@ember/runloop';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import { initialize as initializeWindowOverrides } from '@cenchat/core/initializers/window-overrides';
import { stubService, stubSession } from './stub-service';
import getFixtureData from '../fixture-data';

/**
 * @param {Object} context
 */
export default async function setupTestEnv(context) {
  initializeWindowOverrides(context.owner);
  stubService(context, 'firebaseui', { startAuthUi() {}, resetAuthUi() {} });
  stubService(context, 'router', { urlFor: sinon.stub() });

  context.set('firebase', mockFirebase(context.owner, getFixtureData()));
  context.set('db', context.get('firebase').firestore());
  context.set('session', stubSession(context));
  context.set('store', stubService(context, 'store'));

  const user = await run(() => context.store.findRecord('user', 'user_a'));

  context.set('session.model', user);
}
