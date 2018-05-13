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
    hostname: null,
    name: null,
    theme: 'light',
  },

  /**
   * @param {Element} target
   * @function
   */
  handleSiteFormDataChange(target) {
    this.set('site', { ...this.get('site'), [target.name]: target.value });
  },
});