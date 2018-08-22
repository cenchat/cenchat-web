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

    apiHost: 'https://us-central1-cenchat-stg.cloudfunctions.net/app',
    emailLinkSignInUrl: 'http://localhost:4200/sign-in',
    tenorApiKey: 'OZ2DM5UOGY8A',

    // Addon configs
    'ember-component-css': { namespacing: false },
    firebase: {
      apiKey: 'AIzaSyDIxnajg07XeRb6Yu3ywwDMwpTRLXm6oKQ',
      authDomain: 'cenchat-web-staging.firebaseapp.com',
      databaseURL: 'https://cenchat-web-staging.firebaseio.com',
      projectId: 'cenchat-web-staging',
      storageBucket: 'cenchat-web-staging.appspot.com',
      messagingSenderId: '890151954036',
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
    ENV.apiHost = 'https://web.cenchat.com',
    ENV.emailLinkSignInUrl = 'https://widget.cenchat.com/sign-in',
    ENV.firebase = {
      apiKey: 'AIzaSyA0P-d4FFL1oB_4DBPQoh-jizLFgbnHghU',
      authDomain: 'cenchat-prod.firebaseapp.com',
      databaseURL: 'https://cenchat-prod.firebaseio.com',
      projectId: 'cenchat-prod',
      storageBucket: 'cenchat-prod.appspot.com',
      messagingSenderId: '43732370545',
    };
  }

  return ENV;
};
