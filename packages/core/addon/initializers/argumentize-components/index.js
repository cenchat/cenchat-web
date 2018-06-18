/* eslint ember/no-attrs-in-components: off */
/* eslint ember/no-attrs-snapshot: off */

import Component from '@ember/component';

/**
 * Implements a this.args property in Components using the --propertyName convention
 */
export function initialize() {
  Component.reopen({
    init(...args) {
      this._super(...args);

      this._setupComponentArgs();
    },

    didUpdateAttrs(...args) {
      this._super(...args);

      this._setupComponentArgs();
    },

    _setupComponentArgs() {
      const componentArgs = {};

      for (const prop of Object.keys(this)) {
        if (prop.startsWith('--')) {
          componentArgs[prop.substr(2)] = this.get(prop);
        }
      }

      this.set('args', componentArgs);
    },
  });
}

export default {
  initialize,
};
