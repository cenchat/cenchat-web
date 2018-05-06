import RSVP from 'rsvp';
import Route from '@ember/routing/route';

import fixedEncodeURIComponent from 'comments/utils/fixed-encode-uri-component';

/**
 * @class SitePage
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  queryParams: {
    comment: { as: 'comment' },
    slug: { as: 'slug' },
  },

  /**
   * @override
   */
  model(params) {
    const hash = { page: this.findOrCreatePage(params.page_id) };

    if (params.comment) {
      hash.comment = this.get('store').findRecord('comment', params.comment).catch(() => null);
    }

    return RSVP.hash(hash);
  },

  /**
   * @param {string} pageIdPostfix
   * @return {Promise} Page
   * @function
   * @private
   */
  async findOrCreatePage(pageIdPostfix) {
    const site = this.modelFor('site');
    const pageId = `${site.get('id')}__${pageIdPostfix}`;
    const store = this.get('store');

    try {
      return await store.findRecord('page', pageId);
    } catch (e) {
      const { slug } = this.paramsFor(this.get('routeName'));

      if (slug) {
        const page = store.createRecord('page', {
          site,
          id: pageId,
          slug: fixedEncodeURIComponent(slug),
        });

        return page.save({
          adapterOptions: { onServer: true },
        });
      }
    }

    return null;
  },
});
