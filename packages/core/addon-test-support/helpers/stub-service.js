import { camelize } from '@ember/string';
import Service from '@ember/service';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';

import { getFixtureData, stubPromise } from '@cenchat/core/test-support';

/**
 * @param {Object} context
 * @param {string} name
 * @param {Object} serviceProperties
 * @return {Ember.Service} Service
 */
export function stubService(context, name, serviceProperties) {
  if (serviceProperties) {
    context.owner.register(
      `service:${name}`,
      Service.extend(serviceProperties),
    );
  }

  return context.owner.lookup(`service:${name}`, { as: camelize(name) });
}

/**
 * @param {Object} context
 * @param {Model.User} model
 * @return {Ember.Service} Session service
 */
export function stubSession(context, model) {
  return stubService(context, 'session', {
    currentUser: {
      displayName: 'User A',
      email: 'user_a@gmail.com',
      photoURL: 'user_a.jpg',
      providerData: [{
        photoURL: 'user_a.jpg',
        providerId: 'facebook.com',
        uid: 'fb_user_a',
      }],
      uid: 'user_a',

      getIdToken() {
        return stubPromise(12345);
      },

      linkWithPopup() {
        return stubPromise(true);
      },

      unlink() {
        return stubPromise();
      },

      updateEmail() {
        return stubPromise(true);
      },
    },
    isAuthenticated: true,
    uid: 'user_a',
    model,

    fetch() {
      return stubPromise(true);
    },

    close() {
      return stubPromise(true);
    },
  });
}

/**
 * @param {Object} context
 * @return {Ember.Service} Firebase service
 */
export function stubFirebase(context) {
  return mockFirebase(context.owner, getFixtureData());
}
