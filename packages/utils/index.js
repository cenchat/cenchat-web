/* eslint-env node */

module.exports = {
  name: '@cenchat/utils',
  options: {
    babel: {
      plugins: ['transform-async-to-generator', 'transform-object-rest-spread'],
    },
  },

  isDevelopingAddon() {
    return true;
  },
};
