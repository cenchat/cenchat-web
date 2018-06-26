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
      files: ['firebase/firebase-auth.js'],
    });

    return new MergeTrees([defaultTree, fastbootTransform(browserVendorLib)]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/fastboot-shims/firebase/firebase-auth.js');
    app.import('vendor/fastboot/firebase-auth.js');
  },

  isDevelopingAddon() {
    return true;
  },
};
