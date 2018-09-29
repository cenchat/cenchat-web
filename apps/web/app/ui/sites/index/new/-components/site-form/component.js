import Component from '@ember/component';

/**
 * @class SitesIndexNewSiteForm
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {Object}
   */
  site: {
    displayName: null,
    hostname: null,
    theme: 'light',
  },

  /**
   * @param {Element} target
   * @function
   */
  handleSiteFormDataChange(target) {
    this.set('site', { ...this.site, [target.name]: target.value });
  },
});
