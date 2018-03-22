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
    let comment;

    if (params.comment) {
      comment = this.get('store').findRecord(
        'comment',
        params.comment,
      ).catch((e) => {
        return null;
      });
    }

    return RSVP.hash({
      comment,
      page: this.findOrCreatePage(params.page_id),
    });
  },

  /**
   * Finds a page. Will create it if it doesn't exist.
   *
   * @param {string} pageId
   * @return {Promise} Page
   * @private
   */
  async findOrCreatePage(pageId) {
    const site = this.modelFor('site');

    pageId = `${site.get('id')}__${pageId}`;

    const store = this.get('store');

    try {
      return await store.findRecord('page', pageId);
    } catch (e) {
      const slug = this.paramsFor(this.get('routeName')).slug;

      if (slug) {
        const page = store.createRecord('page', {
          site,
          id: pageId,
          slug: fixedEncodeURIComponent(slug),
        });

        return await page.save({
          adapterOptions: { onServer: true },
        });
      }
    }
  },
});
