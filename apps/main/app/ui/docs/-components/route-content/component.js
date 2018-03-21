import Component from '@ember/component';

/**
 * @class Docs
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * Handles installation card's click event
   *
   * @param {string} platform
   */
  handleInstallationCardClick(platform) {
    this.get('--router').transitionTo('docs.installation', platform);
  },

  /**
   * Handles installation card's keydown event
   *
   * @param {string} platform
   * @param {Event} event
   */
  handleInstallationCardKeydown(platform, event) {
    const code = event.which;

    if (code === 13 || code === 32) {
      event.preventDefault();
      this.get('--router').transitionTo('docs.installation', platform);
    }
  },
});
