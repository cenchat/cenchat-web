import { camelize } from '@ember/string';
import { run } from '@ember/runloop';
import Service from '@ember/service';

/**
 * @param {Object} context
 * @param {string} name
 * @param {Object} serviceProperties
 * @return {Ember.Service} Service
 */
export function stubService(context, name, serviceProperties) {
  if (serviceProperties) {
    context.owner.register(`service:${name}`, Service.extend(serviceProperties));
  }

  return context.owner.lookup(`service:${name}`, { as: camelize(name) });
}

/**
 * @param {Object} context
 * @param {Model.User} model
 * @return {Ember.Service} Session service
 */
export function stubSession(context, model) {
  const session = context.owner.lookup('service:session');
  const { stateMachine } = session;

  run(() => {
    stateMachine.send('startOpen');
    stateMachine.send('finishOpen', {
      currentUser: {
        displayName: 'User A',
        email: 'user_a@gmail.com',
        isAnonymous: false,
        photoURL: 'user_a.jpg',
        providerData: [
          {
            photoURL: 'user_a.jpg',
            providerId: 'facebook.com',
            uid: 'fb_user_a',
          },
        ],
        uid: 'user_a',

        getIdToken() {
          return Promise.resolve(12345);
        },

        linkWithPopup() {
          return Promise.resolve();
        },

        unlink() {
          return Promise.resolve();
        },

        updateEmail() {
          return Promise.resolve();
        },

        updateProfile() {
          return Promise.resolve();
        },
      },
      isAuthenticated: true,
      uid: 'user_a',
      model,

      fetch() {
        return Promise.resolve();
      },

      close() {
        return Promise.resolve();
      },
    });
  });

  return session;
}
