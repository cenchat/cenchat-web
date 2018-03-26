import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Route from '@ember/routing/route';

import fixedEncodeURIComponent from 'comments/utils/fixed-encode-uri-component';

/**
 * @class SiteIndex
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: inject(),

  /**
   * @override
   */
  queryParams: { slug: { as: 'slug' } },

  /**
   * @type {string}
   */
  slug: computed({
    get() {
      const { slug } = this.paramsFor(this.get('routeName'));

      return slug ? fixedEncodeURIComponent(slug) : null;
    },
  }),

  /**
   * @override
   */
  async beforeModel() {
    if (this.get('slug')) {
      const pages = await this.queryPage();

      if (pages.get('length') === 0) {
        return this.createAndTransitionToPage();
      }

      return this.transitionTo('site.page', pages.get('firstObject.id').split('__')[1]);
    }

    return null;
  },

  /**
   * Queries for a page based on the site and slug
   *
   * @return {Promise} Resolves to an array matching the query
   * @private
   */
  queryPage() {
    const siteId = this.modelFor('site').get('id');
    const slug = this.get('slug');

    return this.get('store').query('page', {
      filter(reference) {
        const db = reference.firestore;

        return reference
          .where('site', '==', db.collection('sites').doc(siteId))
          .where('slug', '==', slug);
      },
    });
  },

  /**
   * Creates a new page then transitions to its route
   *
   * @return {Promise} Resolves to the transition object
   * @private
   */
  async createAndTransitionToPage() {
    const site = this.modelFor('site');
    const postfixId = this.get('firebase')
      .firestore()
      .collection('pages')
      .doc()
      .id;
    const pageId = `${site.get('id')}__${postfixId}`;
    const page = await this.get('store').createRecord('page', {
      site,
      id: pageId,
      slug: this.get('slug'),
    }).save({
      adapterOptions: { onServer: true },
    });

    await this.transitionTo('site.page', page.get('id').split('__')[1]);
  },
});
