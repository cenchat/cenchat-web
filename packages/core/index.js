/* eslint-env node */

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: '@cenchat/core',
  options: {
    babel: {
      plugins: ['transform-async-to-generator', 'transform-object-rest-spread'],
    },
  },

  treeForVendor(defaultTree) {
    const browserVendorLib = new Funnel('node_modules', {
      destDir: 'fastboot-shims',
      files: ['firebase/firebase-auth.js', 'firebase/firebase-firestore.js'],
    });

    return new MergeTrees([defaultTree, fastbootTransform(browserVendorLib)]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/fastboot-shims/firebase/firebase-auth.js');
    app.import('vendor/fastboot/firebase-auth.js');
    app.import('vendor/fastboot-shims/firebase/firebase-firestore.js');
    app.import('vendor/fastboot/firebase-firestore.js');

    if (app.env !== 'production') {
      app.import('node_modules/mock-cloud-firestore/dist/browser/mock-cloud-firestore.js');
      app.import('vendor/shims/mock-cloud-firestore.js');
    }
  },

  isDevelopingAddon() {
    return true;
  },
};
