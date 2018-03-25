'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'comments',
    podModulePrefix: 'comments/ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        'ds-improved-ajax': true,
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

    apiHost: ' https://us-central1-cenchat-stg.cloudfunctions.net/app',

    // Addon configs
    'ember-component-css': { namespacing: false },

    firebase: {
      apiKey: 'AIzaSyCHOPAJdJOzFPrEZ5sKPcQFO7lXX05T4Wk',
      authDomain: 'cenchat-stg.firebaseapp.com',
      databaseURL: 'https://cenchat-stg.firebaseio.com',
      projectId: 'cenchat-stg',
      storageBucket: 'cenchat-stg.appspot.com',
      messagingSenderId: '72355646509',
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
    ENV.apiHost = 'https://us-central1-cenchat-prod.cloudfunctions.net/app',
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
