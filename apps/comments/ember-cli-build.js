'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const cssimport = require('postcss-import');
const cssnext = require('postcss-cssnext');

module.exports = function (defaults) {
  const filesToExclude = [];

  // TODO: Remove this once Module Unification lands
  if (EmberApp.env() === 'production') {
    filesToExclude.push('**/*-test.js');
  }

  const app = new EmberApp(defaults, {
    babel: {
      plugins: ['transform-async-to-generator', 'transform-object-rest-spread'],
    },
    fingerprint: {
      exclude: ['blogger.js', 'universal.js'],
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'woff'],
      replaceExtensions: ['html', 'css', 'js', 'webmanifest'],
    },
    funnel: {
      // TODO: Remove this once Module Unification lands
      exclude: filesToExclude,
    },
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [{ module: cssimport }],
      },
      filter: {
        enabled: true,
        plugins: [{
          module: cssnext,
          options: { features: { customProperties: false } },
        }],
      },
    },
    stylelint: { linterConfig: { syntax: 'css' } },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('node_modules/iframe-resizer/js/iframeResizer.contentWindow.js');
  app.import('node_modules/normalize.css/normalize.css');

  return app.toTree();
};
