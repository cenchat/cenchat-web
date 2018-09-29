import Component from '@ember/component';

/**
 * @class SitesSitePagesPageMainContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  slug: null,

  /**
   * @param {Element} target
   * @function
   */
  handleUrlInput(target) {
    this.set('slug', this.getHrefSlug(target.value));
  },

  /**
   * @param {string} href
   * @return {string} Slug of href
   * @function
   */
  getHrefSlug(href) {
    if (href) {
      const url = new URL(href);
      const slug = `${url.pathname}${url.search}`;

      return encodeURIComponent(slug).replace(/[.!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
    }

    return null;
  },
});
