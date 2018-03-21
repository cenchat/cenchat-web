import { computed } from '@ember/object';
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
  queryParams: { slug: { as: 'slug' } },

  /**
   * @type {string}
   */
  slug: computed({
    get() {
      const slug = this.paramsFor(this.get('routeName')).slug;

      return slug ? fixedEncodeURIComponent(slug) : null;
    },
  }),

  /**
   * @override
   */
  model(params) {
    const site = this.modelFor('site');
    const pageId = `${site.get('id')}__${params.page_id}`;

    return this.get('store').findRecord('page', pageId).catch((e) => {
      if (this.get('slug')) {
        return this.get('store').createRecord('page', {
          site,
          id: pageId,
          slug: this.get('slug'),
        }).save({
          adapterOptions: { onServer: true },
        }).then((page) => {
          return page;
        });
      }
    });
  },
});
