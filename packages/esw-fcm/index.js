'use strict';

const Config = require('./lib/config');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: '@cenchat/esw-fcm',

  included(app) {
    this._super.included.apply(this, arguments);

    if (Object.prototype.hasOwnProperty.call(app.options, 'esw-firebase-cloud-messaging')) {
      this.serviceWorkerOption = app.options['esw-firebase-cloud-messaging'];
    } else {
      this.serviceWorkerOption = {};
    }

    const messagingSenderId = this.project.config(app.env).firebase.messagingSenderId;

    this.serviceWorkerOption = { ...this.serviceWorkerOption, messagingSenderId };

    app.import('vendor/fastboot-shims/firebase/firebase-messaging.js');
  },

  treeForServiceWorker(swTree, appTree) {
    const configFile = new Config([appTree], this.serviceWorkerOption);

    return new MergeTrees([swTree, configFile]);
  },

  treeForVendor(defaultTree) {
    const browserVendorLib = new Funnel('node_modules', {
      destDir: 'fastboot-shims',
      files: ['firebase/firebase-messaging.js'],
    });

    return new MergeTrees([defaultTree, fastbootTransform(browserVendorLib)]);
  },

  isDevelopingAddon() {
    return true;
  },
};
