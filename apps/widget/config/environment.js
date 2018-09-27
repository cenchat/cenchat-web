'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'widget',
    podModulePrefix: 'widget/ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    apiHost: 'https://us-central1-cenchat-app-staging.cloudfunctions.net/app',
    emailLinkSignInUrl: 'http://localhost:4200/sign-in',
    tenorApiKey: 'OZ2DM5UOGY8A',

    // Addon configs
    'ember-component-css': { namespacing: false },
    firebase: {
      apiKey: 'AIzaSyAKhyn9clixTGc8-XEqomcdTtI8MWwz3I0',
      authDomain: 'cenchat-app-staging.firebaseapp.com',
      databaseURL: 'https://cenchat-app-staging.firebaseio.com',
      projectId: 'cenchat-app-staging',
      storageBucket: 'cenchat-app-staging.appspot.com',
      messagingSenderId: '744051372318',
    },
    torii: { sessionServiceName: 'session' },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.apiHost = 'https://us-central1-cenchat-app.cloudfunctions.net/app',
    ENV.emailLinkSignInUrl = 'https://widget.cenchat.com/sign-in',
    ENV.firebase = {
      apiKey: 'AIzaSyCaZnNr69Kn4GqsCZm9emWyK-fNEK7vfEI',
      authDomain: 'cenchat-app.firebaseapp.com',
      databaseURL: 'https://cenchat-app.firebaseio.com',
      projectId: 'cenchat-app',
      storageBucket: 'cenchat-app.appspot.com',
      messagingSenderId: '325042052100',
    };
  }

  return ENV;
};
