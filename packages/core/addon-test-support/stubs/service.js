import { camelize } from '@ember/string';
import Service from '@ember/service';

import { stubPromise } from '@cenchat/core/test-support';

/**
 * @param {Object} context
 * @param {string} name
 * @param {Object} serviceProperties
 * @return {Service} Service
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
 * @return {Service} Session service
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
      }, {
        photoURL: 'user_a.jpg',
        providerId: 'google.com',
      }],
      uid: 'user_a',

      getIdToken() {
        return stubPromise(12345);
      },
    },
    isAuthenticated: true,
    uid: 'user_a',
    model: model,

    fetch() {
      return stubPromise(true);
    },

    close() {
      return stubPromise(true);
    },
  });
}
