'use strict';

const Plugin = require('broccoli-plugin');
const firebaseVersion = require('firebase/package.json').version;
const fs = require('fs');
const path = require('path');

module.exports = class Config extends Plugin {
  constructor(inputNodes, option) {
    super(inputNodes, option);

    this.option = option;
  }

  build() {
    let module = '';

    module += `export const firebaseVersion = '${firebaseVersion}';\n`;
    module += `export const messagingSenderId = '${this.option.messagingSenderId}';\n`;

    fs.writeFileSync(path.join(this.outputPath, 'config.js'), module);
  }
};
