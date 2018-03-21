import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

import { getFixtureData } from '@cenchat/core/test-support';
import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';

import { stubValidSession } from 'comments/tests/helpers/torii';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      mockFirebase(this.application.__container__.owner, getFixtureData());
      stubValidSession(this.application, {
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
            return Promise.resolve(12345);
          },

          updateProfile() {},
        },
        isAuthenticated: true,
      });

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);

      return resolve(afterEach).then(() => destroyApp(this.application));
    }
  });
}
